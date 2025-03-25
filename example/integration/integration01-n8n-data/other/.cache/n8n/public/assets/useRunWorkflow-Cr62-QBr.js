import { by as useHistoryStore, U as useWorkflowsStore, p as useSettingsStore, q as computed, dq as CanvasNodeDirtiness, bi as NodeConnectionType, dr as BulkCommand, ds as AddConnectionCommand, dt as RemoveConnectionCommand, du as RemoveNodeCommand, dv as AddNodeCommand, dw as EnableNodeToggleCommand, bq as useNodeHelpers, a5 as useWorkflowHelpers, a as useToast, $ as useRootStore, L as useUIStore, at as useExecutionsStore, b8 as CHAT_TRIGGER_NODE_TYPE, bk as get, dx as SINGLE_WEBHOOK_TRIGGERS, dy as displayForm, dz as isEmpty, de as generateNodesGraph, g as useI18n, ak as useTelemetry, aU as useExternalHooks } from "./index-DkwrpQEB.js";
import { u as usePushConnectionStore } from "./pushConnection.store-DAf-xv0B.js";
function shouldCommandMarkDirty(command, nodeName, siblingCommands, getIncomingConnections, getOutgoingConnectors) {
  if (command instanceof BulkCommand) {
    return command.commands.some(
      (cmd) => shouldCommandMarkDirty(
        cmd,
        nodeName,
        command.commands,
        getIncomingConnections,
        getOutgoingConnectors
      )
    );
  }
  if (command instanceof AddConnectionCommand) {
    return command.connectionData[1]?.node === nodeName;
  }
  if (command instanceof RemoveConnectionCommand) {
    const [from, to] = command.connectionData;
    if (to.node !== nodeName) {
      return false;
    }
    return siblingCommands.some(
      (sibling) => sibling instanceof RemoveNodeCommand && sibling.node.name === from.node
    );
  }
  const incomingNodes = Object.values(getIncomingConnections(nodeName)).flat().flat().filter((connection) => connection !== null).map((connection) => connection.node);
  if (command instanceof AddNodeCommand) {
    return incomingNodes.includes(command.node.name);
  }
  if (command instanceof EnableNodeToggleCommand) {
    return incomingNodes.includes(command.nodeName) && (command.newState || Object.keys(getOutgoingConnectors(command.nodeName)).some(
      (type) => type !== NodeConnectionType.Main
    ));
  }
  return false;
}
function findLoop(nodeName, visited, getIncomingConnections) {
  const index = visited.indexOf(nodeName);
  if (index >= 0) {
    return visited.slice(index);
  }
  const newVisited = [...visited, nodeName];
  for (const [type, typeConnections] of Object.entries(getIncomingConnections(nodeName))) {
    if (type !== NodeConnectionType.Main) {
      continue;
    }
    for (const connections of typeConnections) {
      for (const { node } of connections ?? []) {
        const loop = findLoop(node, newVisited, getIncomingConnections);
        if (loop) {
          return loop;
        }
      }
    }
  }
  return void 0;
}
function useNodeDirtiness() {
  const historyStore = useHistoryStore();
  const workflowsStore = useWorkflowsStore();
  const settingsStore = useSettingsStore();
  function getParentSubNodes(nodeName) {
    return Object.entries(workflowsStore.incomingConnectionsByNodeName(nodeName)).filter(([type]) => type !== NodeConnectionType.Main).flatMap(([, typeConnections]) => typeConnections.flat().filter((conn) => conn !== null));
  }
  function getDirtinessByParametersUpdate(nodeName, after) {
    if ((workflowsStore.getParametersLastUpdate(nodeName) ?? 0) > after) {
      return CanvasNodeDirtiness.PARAMETERS_UPDATED;
    }
    for (const connection of getParentSubNodes(nodeName)) {
      if (getDirtinessByParametersUpdate(connection.node, after) !== void 0) {
        return CanvasNodeDirtiness.UPSTREAM_DIRTY;
      }
    }
    return void 0;
  }
  function getDirtinessByConnectionsUpdate(nodeName, after) {
    for (let i = historyStore.undoStack.length - 1; i >= 0; i--) {
      const command = historyStore.undoStack[i];
      if (command.getTimestamp() < after) {
        break;
      }
      if (shouldCommandMarkDirty(
        command,
        nodeName,
        [],
        workflowsStore.incomingConnectionsByNodeName,
        workflowsStore.outgoingConnectionsByNodeName
      )) {
        return CanvasNodeDirtiness.INCOMING_CONNECTIONS_UPDATED;
      }
    }
    for (const connection of getParentSubNodes(nodeName)) {
      if (getDirtinessByConnectionsUpdate(connection.node, after) !== void 0) {
        return CanvasNodeDirtiness.UPSTREAM_DIRTY;
      }
    }
    return void 0;
  }
  const depthByName = computed(() => {
    const depth = {};
    function setDepthRecursively(nodeName, current, visited) {
      if (visited.has(nodeName)) {
        return;
      }
      const myVisited = new Set(visited);
      myVisited.add(nodeName);
      for (const [type, typeConnections] of Object.entries(
        workflowsStore.outgoingConnectionsByNodeName(nodeName)
      )) {
        if (type !== NodeConnectionType.Main) {
          continue;
        }
        for (const connections of typeConnections) {
          for (const { node } of connections ?? []) {
            if (!depth[node] || depth[node] > current) {
              depth[node] = current;
            }
            setDepthRecursively(node, current + 1, myVisited);
          }
        }
      }
    }
    for (const startNode of workflowsStore.allNodes) {
      const hasIncomingNode = Object.keys(workflowsStore.incomingConnectionsByNodeName(startNode.name)).length > 0;
      if (hasIncomingNode) {
        continue;
      }
      depth[startNode.name] = 0;
      setDepthRecursively(startNode.name, 1, /* @__PURE__ */ new Set());
    }
    return depth;
  });
  const dirtinessByName = computed(() => {
    if (settingsStore.partialExecutionVersion === 1) {
      return {};
    }
    const dirtiness = {};
    const runDataByNode = workflowsStore.getWorkflowRunData ?? {};
    function setDirtiness(nodeName, value) {
      dirtiness[nodeName] = dirtiness[nodeName] ?? value;
      const loop = findLoop(nodeName, [], workflowsStore.incomingConnectionsByNodeName);
      if (!loop) {
        return;
      }
      const loopEntryNodeName = [...loop].sort(
        (a, b) => (depthByName.value[a] ?? Number.MAX_SAFE_INTEGER) - (depthByName.value[b] ?? Number.MAX_SAFE_INTEGER)
      )?.[0];
      if (loopEntryNodeName && depthByName.value[loopEntryNodeName]) {
        dirtiness[loopEntryNodeName] = dirtiness[loopEntryNodeName] ?? CanvasNodeDirtiness.UPSTREAM_DIRTY;
      }
    }
    for (const [nodeName, runData] of Object.entries(runDataByNode)) {
      const runAt = runData[0]?.startTime ?? 0;
      if (!runAt) {
        continue;
      }
      const parameterUpdate = getDirtinessByParametersUpdate(nodeName, runAt);
      if (parameterUpdate) {
        setDirtiness(nodeName, parameterUpdate);
        continue;
      }
      const connectionUpdate = getDirtinessByConnectionsUpdate(nodeName, runAt);
      if (connectionUpdate) {
        setDirtiness(nodeName, connectionUpdate);
        continue;
      }
      const hasInputPinnedDataChanged = Object.values(
        workflowsStore.incomingConnectionsByNodeName(nodeName)
      ).flat().flat().filter((connection) => connection !== null).some((connection) => {
        const pinnedDataLastUpdatedAt = workflowsStore.getPinnedDataLastUpdate(connection.node) ?? 0;
        return pinnedDataLastUpdatedAt > runAt;
      });
      if (hasInputPinnedDataChanged) {
        setDirtiness(nodeName, CanvasNodeDirtiness.PINNED_DATA_UPDATED);
        continue;
      }
      const pinnedDataLastRemovedAt = workflowsStore.getPinnedDataLastRemovedAt(nodeName) ?? 0;
      if (pinnedDataLastRemovedAt > runAt) {
        setDirtiness(nodeName, CanvasNodeDirtiness.PINNED_DATA_UPDATED);
        continue;
      }
    }
    return dirtiness;
  });
  return { dirtinessByName };
}
function useRunWorkflow(useRunWorkflowOpts) {
  const nodeHelpers = useNodeHelpers();
  const workflowHelpers = useWorkflowHelpers({ router: useRunWorkflowOpts.router });
  const i18n = useI18n();
  const toast = useToast();
  const telemetry = useTelemetry();
  const externalHooks = useExternalHooks();
  const settingsStore = useSettingsStore();
  const rootStore = useRootStore();
  const pushConnectionStore = usePushConnectionStore();
  const uiStore = useUIStore();
  const workflowsStore = useWorkflowsStore();
  const executionsStore = useExecutionsStore();
  const { dirtinessByName } = useNodeDirtiness();
  async function runWorkflowApi(runData) {
    if (!pushConnectionStore.isConnected) {
      throw new Error(i18n.baseText("workflowRun.noActiveConnectionToTheServer"));
    }
    workflowsStore.subWorkflowExecutionError = null;
    uiStore.addActiveAction("workflowRunning");
    let response;
    try {
      response = await workflowsStore.runWorkflow(runData);
    } catch (error) {
      uiStore.removeActiveAction("workflowRunning");
      throw error;
    }
    if (response.executionId !== void 0) {
      workflowsStore.activeExecutionId = response.executionId;
    }
    if (response.waitingForWebhook === true && useWorkflowsStore().nodesIssuesExist) {
      uiStore.removeActiveAction("workflowRunning");
      throw new Error(i18n.baseText("workflowRun.showError.resolveOutstandingIssues"));
    }
    if (response.waitingForWebhook === true) {
      workflowsStore.executionWaitingForWebhook = true;
    }
    return response;
  }
  async function runWorkflow(options) {
    const workflow = workflowHelpers.getCurrentWorkflow();
    if (uiStore.isActionActive["workflowRunning"]) {
      return;
    }
    toast.clearAllStickyNotifications();
    try {
      let directParentNodes = [];
      if (options.destinationNode !== void 0) {
        directParentNodes = workflow.getParentNodes(
          options.destinationNode,
          NodeConnectionType.Main,
          -1
        );
      }
      const runData = workflowsStore.getWorkflowRunData;
      if (workflowsStore.isNewWorkflow) {
        await workflowHelpers.saveCurrentWorkflow();
      }
      const workflowData = await workflowHelpers.getWorkflowDataToSave();
      const consolidatedData = consolidateRunDataAndStartNodes(
        directParentNodes,
        runData,
        workflowData.pinData,
        workflow
      );
      const { startNodeNames } = consolidatedData;
      const destinationNodeType = options.destinationNode ? workflowsStore.getNodeByName(options.destinationNode)?.type : "";
      let { runData: newRunData } = consolidatedData;
      let executedNode;
      let triggerToStartFrom;
      if (startNodeNames.length === 0 && "destinationNode" in options && options.destinationNode !== void 0) {
        executedNode = options.destinationNode;
        startNodeNames.push(options.destinationNode);
      } else if (options.triggerNode && options.nodeData) {
        startNodeNames.push(
          ...workflow.getChildNodes(options.triggerNode, NodeConnectionType.Main, 1)
        );
        newRunData = { [options.triggerNode]: [options.nodeData] };
        executedNode = options.triggerNode;
      }
      if (options.triggerNode) {
        triggerToStartFrom = {
          name: options.triggerNode,
          data: options.nodeData
        };
      }
      if (options.destinationNode && (workflowsStore.checkIfNodeHasChatParent(options.destinationNode) || destinationNodeType === CHAT_TRIGGER_NODE_TYPE) && options.source !== "RunData.ManualChatMessage") {
        const startNode = workflow.getStartNode(options.destinationNode);
        if (startNode && startNode.type === CHAT_TRIGGER_NODE_TYPE) {
          const chatHasInputData = nodeHelpers.getNodeInputData(startNode, 0, 0, "input")?.length > 0;
          const chatHasPinData = !!workflowData.pinData?.[startNode.name];
          if (!chatHasInputData && !chatHasPinData) {
            workflowsStore.chatPartialExecutionDestinationNode = options.destinationNode;
            workflowsStore.setPanelOpen("chat", true);
            return;
          }
        }
      }
      const triggers = workflowData.nodes.filter(
        (node) => node.type.toLowerCase().includes("trigger") && !node.disabled
      );
      if (!options.destinationNode && options.source !== "RunData.ManualChatMessage" && workflowData.nodes.some((node) => node.type === CHAT_TRIGGER_NODE_TYPE)) {
        const otherTriggers = triggers.filter((node) => node.type !== CHAT_TRIGGER_NODE_TYPE);
        if (otherTriggers.length) {
          const chatTriggerNode = workflowData.nodes.find(
            (node) => node.type === CHAT_TRIGGER_NODE_TYPE
          );
          if (chatTriggerNode) {
            chatTriggerNode.disabled = true;
          }
        }
      }
      const isPartialExecution = options.destinationNode !== void 0;
      const version = settingsStore.partialExecutionVersion;
      const startNodes = startNodeNames.map((name) => {
        let sourceData = get(runData, [name, 0, "source", 0], null);
        if (sourceData === null) {
          const parentNodes = workflow.getParentNodes(name, NodeConnectionType.Main, 1);
          const executeData = workflowHelpers.executeData(
            parentNodes,
            name,
            NodeConnectionType.Main,
            0
          );
          sourceData = get(executeData, ["source", NodeConnectionType.Main, 0], null);
        }
        return {
          name,
          sourceData
        };
      });
      const singleWebhookTrigger = triggers.find(
        (node) => SINGLE_WEBHOOK_TRIGGERS.includes(node.type)
      );
      if (singleWebhookTrigger && workflowsStore.isWorkflowActive && !workflowData.pinData?.[singleWebhookTrigger.name]) {
        toast.showMessage({
          title: i18n.baseText("workflowRun.showError.deactivate"),
          message: i18n.baseText("workflowRun.showError.productionActive", {
            interpolate: { nodeName: singleWebhookTrigger.name }
          }),
          type: "error"
        });
        return void 0;
      }
      const startRunData = {
        workflowData,
        // With the new partial execution version the backend decides what run
        // data to use and what to ignore.
        runData: !isPartialExecution ? (
          // if it's a full execution we don't want to send any run data
          void 0
        ) : version === 2 ? (
          // With the new partial execution version the backend decides
          //what run data to use and what to ignore.
          runData ?? void 0
        ) : (
          // for v0 we send the run data the FE constructed
          newRunData
        ),
        startNodes,
        triggerToStartFrom
      };
      if ("destinationNode" in options) {
        startRunData.destinationNode = options.destinationNode;
      }
      if (startRunData.runData) {
        const nodeNames = Object.entries(dirtinessByName.value).flatMap(
          ([nodeName, dirtiness]) => dirtiness ? [nodeName] : []
        );
        startRunData.dirtyNodeNames = nodeNames.length > 0 ? nodeNames : void 0;
      }
      const executionData = {
        id: "__IN_PROGRESS__",
        finished: false,
        mode: "manual",
        status: "running",
        createdAt: /* @__PURE__ */ new Date(),
        startedAt: /* @__PURE__ */ new Date(),
        stoppedAt: void 0,
        workflowId: workflow.id,
        executedNode,
        triggerNode: triggerToStartFrom?.name,
        data: {
          resultData: {
            runData: startRunData.runData ?? {},
            pinData: workflowData.pinData,
            workflowData
          }
        },
        workflowData: {
          id: workflowsStore.workflowId,
          name: workflowData.name,
          active: workflowData.active,
          createdAt: 0,
          updatedAt: 0,
          ...workflowData
        }
      };
      workflowsStore.setWorkflowExecutionData(executionData);
      nodeHelpers.updateNodesExecutionIssues();
      workflowHelpers.setDocumentTitle(workflow.name, "EXECUTING");
      const runWorkflowApiResponse = await runWorkflowApi(startRunData);
      const pinData = workflowData.pinData ?? {};
      const getTestUrl = /* @__PURE__ */ (() => {
        return (node) => {
          const path = node.parameters.path || node.parameters.options?.path || node.webhookId;
          return `${rootStore.formTestUrl}/${path}`;
        };
      })();
      try {
        displayForm({
          nodes: workflowData.nodes,
          runData: workflowsStore.getWorkflowExecution?.data?.resultData?.runData,
          destinationNode: options.destinationNode,
          triggerNode: options.triggerNode,
          pinData,
          directParentNodes,
          source: options.source,
          getTestUrl
        });
      } catch (error) {
      }
      await externalHooks.run("workflowRun.runWorkflow", {
        nodeName: options.destinationNode,
        source: options.source
      });
      return runWorkflowApiResponse;
    } catch (error) {
      workflowHelpers.setDocumentTitle(workflow.name, "ERROR");
      toast.showError(error, i18n.baseText("workflowRun.showError.title"));
      return void 0;
    }
  }
  function consolidateRunDataAndStartNodes(directParentNodes, runData, pinData, workflow) {
    const startNodeNames = /* @__PURE__ */ new Set();
    let newRunData;
    if (runData !== null && Object.keys(runData).length !== 0) {
      newRunData = {};
      for (const directParentNode of directParentNodes) {
        const parentNodes = workflow.getParentNodes(directParentNode, NodeConnectionType.Main);
        if (workflow.nodes[directParentNode].disabled) continue;
        parentNodes.push(directParentNode);
        for (const parentNode of parentNodes) {
          if (!runData[parentNode]?.length && !pinData?.[parentNode]?.length || runData[parentNode]?.[0]?.error !== void 0) {
            startNodeNames.add(parentNode);
            break;
          }
          if (runData[parentNode] && !runData[parentNode]?.[0]?.error) {
            newRunData[parentNode] = runData[parentNode]?.slice(0, 1);
          }
        }
      }
      if (isEmpty(newRunData)) {
        newRunData = void 0;
      }
    }
    return { runData: newRunData, startNodeNames: [...startNodeNames] };
  }
  async function stopCurrentExecution() {
    const executionId = workflowsStore.activeExecutionId;
    if (executionId === null) {
      return;
    }
    try {
      await executionsStore.stopCurrentExecution(executionId);
    } catch (error) {
      const execution = await workflowsStore.getExecution(executionId);
      if (execution === void 0) {
        toast.showMessage({
          title: i18n.baseText("nodeView.showMessage.stopExecutionCatch.unsaved.title"),
          message: i18n.baseText("nodeView.showMessage.stopExecutionCatch.unsaved.message"),
          type: "success"
        });
      } else if (execution?.finished) {
        const executedData = {
          data: execution.data,
          finished: execution.finished,
          mode: execution.mode,
          startedAt: execution.startedAt,
          stoppedAt: execution.stoppedAt
        };
        workflowsStore.setWorkflowExecutionData(executedData);
        toast.showMessage({
          title: i18n.baseText("nodeView.showMessage.stopExecutionCatch.title"),
          message: i18n.baseText("nodeView.showMessage.stopExecutionCatch.message"),
          type: "success"
        });
      } else {
        toast.showError(error, i18n.baseText("nodeView.showError.stopExecution.title"));
      }
    } finally {
      workflowsStore.markExecutionAsStopped();
    }
  }
  async function stopWaitingForWebhook() {
    try {
      await workflowsStore.removeTestWebhook(workflowsStore.workflowId);
    } catch (error) {
      toast.showError(error, i18n.baseText("nodeView.showError.stopWaitingForWebhook.title"));
      return;
    }
  }
  async function runEntireWorkflow(source, triggerNode) {
    const workflow = workflowHelpers.getCurrentWorkflow();
    void workflowHelpers.getWorkflowDataToSave().then((workflowData) => {
      const telemetryPayload = {
        workflow_id: workflow.id,
        node_graph_string: JSON.stringify(
          generateNodesGraph(
            workflowData,
            workflowHelpers.getNodeTypes(),
            { isCloudDeployment: settingsStore.isCloudDeployment }
          ).nodeGraph
        ),
        button_type: source
      };
      telemetry.track("User clicked execute workflow button", telemetryPayload);
      void externalHooks.run("nodeView.onRunWorkflow", telemetryPayload);
    });
    void runWorkflow({ triggerNode });
  }
  return {
    consolidateRunDataAndStartNodes,
    runEntireWorkflow,
    runWorkflow,
    runWorkflowApi,
    stopCurrentExecution,
    stopWaitingForWebhook
  };
}
export {
  useNodeDirtiness as a,
  useRunWorkflow as u
};
