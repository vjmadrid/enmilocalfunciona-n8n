import { dA as baseSlice, dB as toString, bp as useNodeTypesStore, q as computed, l as unref, dC as isSubNodeType, $ as useRootStore, U as useWorkflowsStore, a as useToast, dD as PIN_DATA_NODE_TYPES_DENYLIST, bh as getNodeOutputs, bi as NodeConnectionType, dE as jsonStringify, dF as toMegaBytes, dG as stringSizeInBytes, bA as jsonParse, g as useI18n, ak as useTelemetry, aU as useExternalHooks, dH as useDataSchema, dI as MAX_PINNED_DATA_SIZE, dJ as MAX_WORKFLOW_SIZE, dK as MAX_EXPECTED_REQUEST_SIZE } from "./index-DkwrpQEB.js";
function castSlice(array, start, end) {
  var length = array.length;
  end = end === void 0 ? length : end;
  return !start && end >= length ? array : baseSlice(array, start, end);
}
var rsAstralRange$1 = "\\ud800-\\udfff", rsComboMarksRange$1 = "\\u0300-\\u036f", reComboHalfMarksRange$1 = "\\ufe20-\\ufe2f", rsComboSymbolsRange$1 = "\\u20d0-\\u20ff", rsComboRange$1 = rsComboMarksRange$1 + reComboHalfMarksRange$1 + rsComboSymbolsRange$1, rsVarRange$1 = "\\ufe0e\\ufe0f";
var rsZWJ$1 = "\\u200d";
var reHasUnicode = RegExp("[" + rsZWJ$1 + rsAstralRange$1 + rsComboRange$1 + rsVarRange$1 + "]");
function hasUnicode(string) {
  return reHasUnicode.test(string);
}
function asciiToArray(string) {
  return string.split("");
}
var rsAstralRange = "\\ud800-\\udfff", rsComboMarksRange = "\\u0300-\\u036f", reComboHalfMarksRange = "\\ufe20-\\ufe2f", rsComboSymbolsRange = "\\u20d0-\\u20ff", rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange, rsVarRange = "\\ufe0e\\ufe0f";
var rsAstral = "[" + rsAstralRange + "]", rsCombo = "[" + rsComboRange + "]", rsFitz = "\\ud83c[\\udffb-\\udfff]", rsModifier = "(?:" + rsCombo + "|" + rsFitz + ")", rsNonAstral = "[^" + rsAstralRange + "]", rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}", rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]", rsZWJ = "\\u200d";
var reOptMod = rsModifier + "?", rsOptVar = "[" + rsVarRange + "]?", rsOptJoin = "(?:" + rsZWJ + "(?:" + [rsNonAstral, rsRegional, rsSurrPair].join("|") + ")" + rsOptVar + reOptMod + ")*", rsSeq = rsOptVar + reOptMod + rsOptJoin, rsSymbol = "(?:" + [rsNonAstral + rsCombo + "?", rsCombo, rsRegional, rsSurrPair, rsAstral].join("|") + ")";
var reUnicode = RegExp(rsFitz + "(?=" + rsFitz + ")|" + rsSymbol + rsSeq, "g");
function unicodeToArray(string) {
  return string.match(reUnicode) || [];
}
function stringToArray(string) {
  return hasUnicode(string) ? unicodeToArray(string) : asciiToArray(string);
}
function createCaseFirst(methodName) {
  return function(string) {
    string = toString(string);
    var strSymbols = hasUnicode(string) ? stringToArray(string) : void 0;
    var chr = strSymbols ? strSymbols[0] : string.charAt(0);
    var trailing = strSymbols ? castSlice(strSymbols, 1).join("") : string.slice(1);
    return chr[methodName]() + trailing;
  };
}
var upperFirst = createCaseFirst("toUpperCase");
function capitalize(string) {
  return upperFirst(toString(string).toLowerCase());
}
function useNodeType(options = {}) {
  const nodeTypesStore = useNodeTypesStore();
  const nodeType = computed(() => {
    if (options.nodeType) {
      return unref(options.nodeType);
    }
    const activeNode = unref(options.node);
    if (activeNode) {
      return nodeTypesStore.getNodeType(activeNode.type, activeNode.typeVersion);
    }
    return null;
  });
  const isSubNodeType$1 = computed(() => isSubNodeType(nodeType.value));
  const isMultipleOutputsNodeType = computed(() => {
    const outputs = nodeType.value?.outputs;
    if (typeof outputs === "string") return false;
    return (outputs ?? []).length > 1;
  });
  return {
    nodeType,
    isSubNodeType: isSubNodeType$1,
    isMultipleOutputsNodeType
  };
}
function usePinnedData(node, options = {}) {
  const rootStore = useRootStore();
  const workflowsStore = useWorkflowsStore();
  const toast = useToast();
  const i18n = useI18n();
  const telemetry = useTelemetry();
  const externalHooks = useExternalHooks();
  const { getInputDataWithPinned } = useDataSchema();
  const { isSubNodeType: isSubNodeType2, isMultipleOutputsNodeType } = useNodeType({
    node
  });
  const data = computed(() => {
    const targetNode = unref(node);
    return targetNode ? workflowsStore.pinDataByNodeName(targetNode.name) : void 0;
  });
  const hasData = computed(() => {
    const targetNode = unref(node);
    return !!targetNode && typeof data.value !== "undefined";
  });
  const isValidNodeType = computed(() => {
    const targetNode = unref(node);
    return !!targetNode && !isSubNodeType2.value && !isMultipleOutputsNodeType.value && !PIN_DATA_NODE_TYPES_DENYLIST.includes(targetNode.type);
  });
  function canPinNode(checkDataEmpty = false, outputIndex) {
    const targetNode = unref(node);
    if (targetNode === null || PIN_DATA_NODE_TYPES_DENYLIST.includes(targetNode.type)) return false;
    const nodeType = useNodeTypesStore().getNodeType(targetNode.type, targetNode.typeVersion);
    const dataToPin = getInputDataWithPinned(targetNode);
    if (!nodeType || checkDataEmpty && dataToPin.length === 0) return false;
    const workflow = workflowsStore.getCurrentWorkflow();
    const outputs = getNodeOutputs(workflow, targetNode, nodeType).map(
      (output) => typeof output === "string" ? { type: output } : output
    );
    const mainOutputs = outputs.filter(
      (output) => output.type === NodeConnectionType.Main && output.category !== "error"
    );
    let indexAcceptable = true;
    if (outputIndex !== void 0) {
      const output = outputs[outputIndex];
      if (outputs[outputIndex] === void 0) return false;
      indexAcceptable = output.type === NodeConnectionType.Main && output.category !== "error";
    }
    return mainOutputs.length === 1 && indexAcceptable;
  }
  function isValidJSON(data2) {
    try {
      JSON.parse(data2);
      return true;
    } catch (error) {
      const title = i18n.baseText("runData.editOutputInvalid");
      const toRemove = new RegExp(/JSON\.parse:|of the JSON data/, "g");
      const message = error.message.replace(toRemove, "").trim();
      const positionMatchRegEx = /at position (\d+)/;
      const positionMatch = error.message.match(positionMatchRegEx);
      error.message = message.charAt(0).toUpperCase() + message.slice(1);
      error.message = error.message.replace(
        "Unexpected token ' in JSON",
        i18n.baseText("runData.editOutputInvalid.singleQuote")
      );
      if (positionMatch) {
        const position = parseInt(positionMatch[1], 10);
        const lineBreaksUpToPosition = (data2.slice(0, position).match(/\n/g) || []).length;
        error.message = error.message.replace(
          positionMatchRegEx,
          i18n.baseText("runData.editOutputInvalid.atPosition", {
            interpolate: {
              position: `${position}`
            }
          })
        );
        error.message = `${i18n.baseText("runData.editOutputInvalid.onLine", {
          interpolate: {
            line: `${lineBreaksUpToPosition + 1}`
          }
        })} ${error.message}`;
      }
      toast.showError(error, title);
      return false;
    }
  }
  function getMaxPinnedDataSize() {
    return window.maxPinnedDataSize ?? MAX_PINNED_DATA_SIZE;
  }
  function isValidSize(data2) {
    const targetNode = unref(node);
    if (!targetNode) {
      return false;
    }
    if (typeof data2 === "object") data2 = JSON.stringify(data2);
    const { pinData: currentPinData, ...workflow } = workflowsStore.getCurrentWorkflow();
    const workflowJson = jsonStringify(workflow, { replaceCircularRefs: true });
    const newPinData = { ...currentPinData, [targetNode.name]: data2 };
    const newPinDataSize = workflowsStore.getPinDataSize(newPinData);
    if (newPinDataSize > getMaxPinnedDataSize()) {
      toast.showError(
        new Error(
          i18n.baseText("ndv.pinData.error.tooLarge.description", {
            interpolate: {
              size: toMegaBytes(newPinDataSize),
              limit: toMegaBytes(getMaxPinnedDataSize())
            }
          })
        ),
        i18n.baseText("ndv.pinData.error.tooLarge.title")
      );
      return false;
    }
    const workflowSize = stringSizeInBytes(workflowJson) + newPinDataSize;
    const limit = MAX_WORKFLOW_SIZE - MAX_EXPECTED_REQUEST_SIZE;
    if (workflowSize > limit) {
      toast.showError(
        new Error(
          i18n.baseText("ndv.pinData.error.tooLargeWorkflow.description", {
            interpolate: { size: toMegaBytes(workflowSize), limit: toMegaBytes(limit) }
          })
        ),
        i18n.baseText("ndv.pinData.error.tooLargeWorkflow.title")
      );
      return false;
    }
    return true;
  }
  function onSetDataSuccess({ source }) {
    const targetNode = unref(node);
    const displayMode = unref(options.displayMode);
    const runIndex = unref(options.runIndex);
    const telemetryPayload = {
      pinning_source: source,
      node_type: targetNode?.type,
      push_ref: rootStore.pushRef,
      data_size: stringSizeInBytes(data.value),
      view: displayMode,
      run_index: runIndex
    };
    void externalHooks.run("runData.onDataPinningSuccess", telemetryPayload);
    telemetry.track("Ndv data pinning success", telemetryPayload);
  }
  function onSetDataError({
    errorType,
    source
  }) {
    const targetNode = unref(node);
    const displayMode = unref(options.displayMode);
    const runIndex = unref(options.runIndex);
    telemetry.track("Ndv data pinning failure", {
      pinning_source: source,
      node_type: targetNode?.type,
      push_ref: rootStore.pushRef,
      data_size: stringSizeInBytes(data.value),
      view: displayMode,
      run_index: runIndex,
      error_type: errorType
    });
  }
  function setData(data2, source) {
    const targetNode = unref(node);
    if (!targetNode) {
      return;
    }
    if (typeof data2 === "string") {
      if (!isValidJSON(data2)) {
        onSetDataError({ errorType: "invalid-json", source });
        throw new Error("Invalid JSON");
      }
      data2 = jsonParse(data2);
    }
    if (!isValidSize(data2)) {
      onSetDataError({ errorType: "data-too-large", source });
      throw new Error("Data too large");
    }
    workflowsStore.pinData({ node: targetNode, data: data2 });
    onSetDataSuccess({ source });
  }
  function onUnsetData({ source }) {
    const targetNode = unref(node);
    const runIndex = unref(options.runIndex);
    telemetry.track("User unpinned ndv data", {
      node_type: targetNode?.type,
      push_ref: rootStore.pushRef,
      run_index: runIndex,
      source,
      data_size: stringSizeInBytes(data.value)
    });
  }
  function unsetData(source) {
    const targetNode = unref(node);
    if (!targetNode) {
      return;
    }
    onUnsetData({ source });
    workflowsStore.unpinData({ node: targetNode });
  }
  return {
    data,
    hasData,
    isValidNodeType,
    canPinNode,
    setData,
    onSetDataSuccess,
    onSetDataError,
    unsetData,
    onUnsetData,
    isValidJSON,
    isValidSize
  };
}
export {
  useNodeType as a,
  upperFirst as b,
  capitalize as c,
  usePinnedData as u
};
