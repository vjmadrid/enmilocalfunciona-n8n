import { u as useTestDefinitionForm } from "./useTestDefinitionForm-wWVotwCR.js";
import { d as defineComponent, U as useWorkflowsStore, bp as useNodeTypesStore, W as useRoute, b as useRouter, r as ref, q as computed, o as onMounted, l as unref, c as openBlock, h as createElementBlock, i as createVNode, w as withCtx, k as createTextVNode, t as toDisplayString, n as normalizeClass, e as createBlock, f as createCommentVNode, aQ as N8nTooltip, g as useI18n, D as createEventBus, ab as useCssModule, m as resolveComponent, ak as useTelemetry, _ as _export_sfc, j as createBaseVNode, fY as N8nText, v as renderSlot, F as Fragment, c$ as InfoTip, g0 as ne, cS as useTemplateRef, B as renderList, cR as N8nButton, z as nextTick, g1 as N8nInput, aR as _sfc_main$a, a2 as useProjectsStore, aP as N8nLink, V as VIEWS, g2 as __unplugin_components_0$2, g3 as SAMPLE_EVALUATION_WORKFLOW, fn as mergeModels, fo as useModel, g4 as Tag, g5 as NODE_PINNING_MODAL_KEY, g6 as __unplugin_components_1, al as useMessage, dS as dateFormat, bo as watchEffect, ax as withDirectives, ay as vShow, fZ as N8nIcon, C as normalizeStyle, g7 as TestTableBase, K as useDebounce, a as useToast, bX as useTestDefinitionStore, fH as useAnnotationTagsStore, L as useUIStore, Z as useDocumentVisibility, I as watch, g8 as InlineNameEdit } from "./index-DkwrpQEB.js";
import { u as useVueFlow, a as useCanvasMapping, _ as __unplugin_components_0$1 } from "./useCanvasMapping-BE9PMjep.js";
import { a as useCanvasOperations } from "./useCanvasOperations-BYt9MoCZ.js";
import { L as Line } from "./index-CnJ6KvXD.js";
import "./usePinnedData-cAEPUGIg.js";
import "./useRunWorkflow-Cr62-QBr.js";
import "./pushConnection.store-DAf-xv0B.js";
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "NodesPinning",
  props: {
    modelValue: {}
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const workflowsStore = useWorkflowsStore();
    const nodeTypesStore = useNodeTypesStore();
    const route = useRoute();
    const router = useRouter();
    const locale = useI18n();
    const telemetry = useTelemetry();
    const { resetWorkspace, initializeWorkspace } = useCanvasOperations({ router });
    const eventBus = createEventBus();
    const style = useCssModule();
    const uuid = crypto.randomUUID();
    const props = __props;
    const emit = __emit;
    const isLoading = ref(true);
    const workflowId = computed(() => route.params.name);
    const testId = computed(() => route.params.testId);
    const workflow = computed(() => workflowsStore.getWorkflowById(workflowId.value));
    const workflowObject = computed(() => workflowsStore.getCurrentWorkflow(true));
    const canvasId = computed(() => `${uuid}-${testId.value}`);
    const { onNodesInitialized, fitView, zoomTo } = useVueFlow({ id: canvasId.value });
    const nodes = computed(() => {
      return workflow.value.nodes ?? [];
    });
    const connections = computed(() => workflow.value.connections);
    const { nodes: mappedNodes, connections: mappedConnections } = useCanvasMapping({
      nodes,
      connections,
      workflowObject
    });
    async function loadData() {
      workflowsStore.resetState();
      resetWorkspace();
      const loadingPromise = Promise.all([
        nodeTypesStore.getNodeTypes(),
        workflowsStore.fetchWorkflow(workflowId.value)
      ]);
      await loadingPromise;
      initializeWorkspace(workflow.value);
      disableAllNodes();
    }
    function getNodeNameById(id) {
      return mappedNodes.value.find((node) => node.id === id)?.data?.name;
    }
    function updateNodeClasses(nodeIds, isPinned2) {
      eventBus.emit("nodes:action", {
        ids: nodeIds,
        action: "update:node:class",
        payload: {
          className: style.pinnedNode,
          add: isPinned2
        }
      });
      eventBus.emit("nodes:action", {
        ids: nodeIds,
        action: "update:node:class",
        payload: {
          className: style.notPinnedNode,
          add: !isPinned2
        }
      });
    }
    function disableAllNodes() {
      const ids = mappedNodes.value.map((node) => node.id);
      updateNodeClasses(ids, false);
      const pinnedNodes = props.modelValue.map((node) => node.id).filter((id) => id !== null);
      if (pinnedNodes.length > 0) {
        updateNodeClasses(pinnedNodes, true);
      }
    }
    function onPinButtonClick(data) {
      const nodeName = getNodeNameById(data.id);
      if (!nodeName) return;
      const isPinned2 = props.modelValue.some((node) => node.id === data.id);
      const updatedNodes = isPinned2 ? props.modelValue.filter((node) => node.id !== data.id) : [...props.modelValue, { name: nodeName, id: data.id }];
      emit("update:modelValue", updatedNodes);
      updateNodeClasses([data.id], !isPinned2);
      if (!isPinned2) {
        telemetry.track("User selected node to be mocked", {
          node_id: data.id,
          test_id: testId.value
        });
      }
    }
    function isPinButtonVisible(outputs, inputs) {
      return outputs.length === 1 && inputs.length >= 1;
    }
    const isPinned = (data) => props.modelValue.some((node) => node.id === data.id);
    onNodesInitialized(async () => {
      await fitView();
      isLoading.value = false;
      await zoomTo(0.7, { duration: 400 });
    });
    onMounted(loadData);
    return (_ctx, _cache) => {
      const _component_N8nHeading = resolveComponent("N8nHeading");
      const _component_N8nText = resolveComponent("N8nText");
      const _component_N8nSpinner = resolveComponent("N8nSpinner");
      const _component_N8nButton = resolveComponent("N8nButton");
      const _component_Canvas = __unplugin_components_0$1;
      return unref(mappedNodes).length === 0 ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: normalizeClass(_ctx.$style.noNodes)
      }, [
        createVNode(_component_N8nHeading, {
          size: "large",
          bold: true,
          class: normalizeClass(_ctx.$style.noNodesTitle)
        }, {
          default: withCtx(() => [
            createTextVNode(toDisplayString(unref(locale).baseText("testDefinition.edit.pinNodes.noNodes.title")), 1)
          ]),
          _: 1
        }, 8, ["class"]),
        createVNode(_component_N8nText, null, {
          default: withCtx(() => [
            createTextVNode(toDisplayString(unref(locale).baseText("testDefinition.edit.pinNodes.noNodes.description")), 1)
          ]),
          _: 1
        })
      ], 2)) : (openBlock(), createElementBlock("div", {
        key: 1,
        class: normalizeClass(_ctx.$style.container)
      }, [
        isLoading.value ? (openBlock(), createBlock(_component_N8nSpinner, {
          key: 0,
          size: "xlarge",
          type: "dots",
          class: normalizeClass(_ctx.$style.spinner)
        }, null, 8, ["class"])) : createCommentVNode("", true),
        createVNode(_component_Canvas, {
          id: canvasId.value,
          loading: isLoading.value,
          class: normalizeClass({ [_ctx.$style.canvas]: true }),
          nodes: unref(mappedNodes),
          connections: unref(mappedConnections),
          "show-bug-reporting-button": false,
          "read-only": true,
          "event-bus": unref(eventBus)
        }, {
          nodeToolbar: withCtx(({ data, outputs, inputs }) => [
            isPinButtonVisible(outputs, inputs) ? (openBlock(), createElementBlock("div", {
              key: 0,
              class: normalizeClass({
                [_ctx.$style.pinButtonContainer]: true,
                [_ctx.$style.pinButtonContainerPinned]: isPinned(data)
              })
            }, [
              createVNode(unref(N8nTooltip), { placement: "left" }, {
                content: withCtx(() => [
                  createTextVNode(toDisplayString(unref(locale).baseText("testDefinition.edit.nodesPinning.pinButtonTooltip")), 1)
                ]),
                default: withCtx(() => [
                  isPinned(data) ? (openBlock(), createBlock(_component_N8nButton, {
                    key: 0,
                    icon: "thumbtack",
                    block: "",
                    type: "secondary",
                    class: normalizeClass(_ctx.$style.customSecondary),
                    "data-test-id": "node-pin-button",
                    onClick: ($event) => onPinButtonClick(data)
                  }, {
                    default: withCtx(() => _cache[0] || (_cache[0] = [
                      createTextVNode(" Un Mock ")
                    ])),
                    _: 2
                  }, 1032, ["class", "onClick"])) : (openBlock(), createBlock(_component_N8nButton, {
                    key: 1,
                    icon: "thumbtack",
                    block: "",
                    type: "secondary",
                    "data-test-id": "node-pin-button",
                    onClick: ($event) => onPinButtonClick(data)
                  }, {
                    default: withCtx(() => _cache[1] || (_cache[1] = [
                      createTextVNode(" Mock ")
                    ])),
                    _: 2
                  }, 1032, ["onClick"]))
                ]),
                _: 2
              }, 1024)
            ], 2)) : createCommentVNode("", true)
          ]),
          _: 1
        }, 8, ["id", "loading", "class", "nodes", "connections", "event-bus"])
      ], 2));
    };
  }
});
const container$1 = "_container_z719h_123";
const pinButtonContainer = "_pinButtonContainer_z719h_128";
const pinButtonContainerPinned = "_pinButtonContainerPinned_z719h_139";
const customSecondary = "_customSecondary_z719h_143";
const spinner = "_spinner_z719h_152";
const noNodes = "_noNodes_z719h_159";
const style0$8 = {
  container: container$1,
  pinButtonContainer,
  pinButtonContainerPinned,
  customSecondary,
  spinner,
  noNodes
};
const cssModules$8 = {
  "$style": style0$8
};
const __unplugin_components_0 = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["__cssModules", cssModules$8]]);
const blockArrow = "_blockArrow_hbkir_123";
const stalk = "_stalk_hbkir_129";
const arrowHead = "_arrowHead_hbkir_136";
const style0$7 = {
  blockArrow,
  stalk,
  arrowHead
};
const _sfc_main$8 = {};
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(_ctx.$style.blockArrow)
  }, [
    createBaseVNode("div", {
      class: normalizeClass(_ctx.$style.stalk)
    }, null, 2),
    createBaseVNode("div", {
      class: normalizeClass(_ctx.$style.arrowHead)
    }, null, 2)
  ], 2);
}
const cssModules$7 = {
  "$style": style0$7
};
const BlockArrow = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render], ["__cssModules", cssModules$7]]);
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "EvaluationStep",
  props: {
    title: { default: "" },
    warning: { type: Boolean, default: false },
    expanded: { type: Boolean, default: false },
    description: { default: "" },
    issues: { default: () => [] },
    showIssues: { type: Boolean, default: true },
    tooltip: {},
    externalTooltip: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    const locale = useI18n();
    const isExpanded = ref(props.expanded);
    const $style = useCssModule();
    const hasIssues = computed(() => props.issues.length > 0);
    const containerClass = computed(() => {
      return {
        [$style.evaluationStep]: true,
        [$style["has-issues"]]: true
      };
    });
    const toggleExpand = () => isExpanded.value = !isExpanded.value;
    const renderIssues = computed(() => props.showIssues && props.issues.length);
    const issuesList = computed(() => props.issues.map((issue) => issue.message).join(", "));
    const resizeModifier = {
      name: "resize",
      enabled: true,
      phase: "beforeWrite",
      requires: ["preventOverflow"],
      fn({ state }) {
        const overflow = ne(state);
        const MARGIN_RIGHT = 15;
        const maxWidth = state.rects.popper.width - overflow.right - MARGIN_RIGHT;
        state.styles.popper.width = `${maxWidth}px`;
      }
    };
    const popperModifiers = [
      resizeModifier,
      { name: "preventOverflow", options: { boundary: "document" } },
      { name: "flip", enabled: false }
      // prevent the tooltip from flipping
    ];
    return (_ctx, _cache) => {
      const _component_font_awesome_icon = resolveComponent("font-awesome-icon");
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(containerClass.value),
        "data-test-id": "evaluation-step"
      }, [
        createBaseVNode("div", {
          class: normalizeClass(unref($style).content)
        }, [
          createVNode(unref(N8nTooltip), {
            placement: "right",
            disabled: !_ctx.externalTooltip,
            "show-arrow": false,
            "popper-class": unref($style).evaluationTooltip,
            "popper-options": { modifiers: popperModifiers },
            content: _ctx.tooltip
          }, {
            default: withCtx(() => [
              createBaseVNode("div", {
                class: normalizeClass(unref($style).header),
                onClick: toggleExpand
              }, [
                createBaseVNode("div", {
                  class: normalizeClass(unref($style).label)
                }, [
                  createVNode(unref(N8nText), { bold: "" }, {
                    default: withCtx(() => [
                      _ctx.$slots.title ? renderSlot(_ctx.$slots, "title", { key: 0 }) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                        createTextVNode(toDisplayString(_ctx.title), 1)
                      ], 64))
                    ]),
                    _: 3
                  }),
                  !_ctx.externalTooltip ? (openBlock(), createBlock(unref(InfoTip), {
                    key: 0,
                    class: normalizeClass(unref($style).infoTip),
                    bold: true,
                    type: "tooltip",
                    theme: "info",
                    "tooltip-placement": "top",
                    enterable: false
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(_ctx.tooltip), 1)
                    ]),
                    _: 1
                  }, 8, ["class"])) : createCommentVNode("", true)
                ], 2),
                createBaseVNode("div", {
                  class: normalizeClass(unref($style).actions)
                }, [
                  renderIssues.value ? (openBlock(), createBlock(unref(InfoTip), {
                    key: 0,
                    bold: true,
                    type: "tooltip",
                    theme: "warning",
                    "tooltip-placement": "top",
                    enterable: false
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(issuesList.value), 1)
                    ]),
                    _: 1
                  })) : createCommentVNode("", true),
                  _ctx.$slots.cardContent ? (openBlock(), createBlock(unref(N8nText), {
                    key: 1,
                    "data-test-id": "evaluation-step-collapse-button",
                    size: "xsmall",
                    color: hasIssues.value ? "primary" : "text-base",
                    bold: ""
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(isExpanded.value ? unref(locale).baseText("testDefinition.edit.step.collapse") : unref(locale).baseText("testDefinition.edit.step.configure")) + " ", 1),
                      createVNode(_component_font_awesome_icon, {
                        icon: isExpanded.value ? "angle-up" : "angle-down",
                        size: "lg"
                      }, null, 8, ["icon"])
                    ]),
                    _: 1
                  }, 8, ["color"])) : createCommentVNode("", true)
                ], 2)
              ], 2)
            ]),
            _: 3
          }, 8, ["disabled", "popper-class", "popper-options", "content"]),
          _ctx.$slots.cardContent && isExpanded.value ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: normalizeClass(unref($style).cardContentWrapper)
          }, [
            createBaseVNode("div", {
              class: normalizeClass(unref($style).cardContent),
              "data-test-id": "evaluation-step-content"
            }, [
              _ctx.description ? (openBlock(), createBlock(unref(N8nText), {
                key: 0,
                size: "small",
                color: "text-light"
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(_ctx.description), 1)
                ]),
                _: 1
              })) : createCommentVNode("", true),
              renderSlot(_ctx.$slots, "cardContent")
            ], 2)
          ], 2)) : createCommentVNode("", true)
        ], 2)
      ], 2);
    };
  }
});
const evaluationStep = "_evaluationStep_1h8fm_123";
const evaluationTooltip = "_evaluationTooltip_1h8fm_133";
const icon = "_icon_1h8fm_141";
const warning = "_warning_1h8fm_150";
const content$1 = "_content_1h8fm_154";
const header$1 = "_header_1h8fm_158";
const label = "_label_1h8fm_166";
const infoTip = "_infoTip_1h8fm_172";
const actions = "_actions_1h8fm_180";
const cardContent = "_cardContent_1h8fm_186";
const cardContentWrapper = "_cardContentWrapper_1h8fm_192";
const style0$6 = {
  evaluationStep,
  evaluationTooltip,
  icon,
  warning,
  content: content$1,
  header: header$1,
  label,
  infoTip,
  actions,
  cardContent,
  cardContentWrapper,
  "has-issues": "_has-issues_1h8fm_196"
};
const cssModules$6 = {
  "$style": style0$6
};
const EvaluationStep = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__cssModules", cssModules$6]]);
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "MetricsInput",
  props: {
    modelValue: {}
  },
  emits: ["update:modelValue", "deleteMetric"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const locale = useI18n();
    const metricsRefs = useTemplateRef("metric");
    function addNewMetric() {
      emit("update:modelValue", [...props.modelValue, { name: "" }]);
      void nextTick(() => metricsRefs.value?.at(-1)?.focus());
    }
    function updateMetric(index, name) {
      const newMetrics = [...props.modelValue];
      newMetrics[index].name = name;
      emit("update:modelValue", newMetrics);
    }
    function onDeleteMetric(metric, index) {
      if (!metric.id) {
        const newMetrics = [...props.modelValue];
        newMetrics.splice(index, 1);
        emit("update:modelValue", newMetrics);
      } else {
        emit("deleteMetric", metric);
      }
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", null, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.modelValue, (metric, index) => {
          return openBlock(), createElementBlock("div", {
            key: index,
            class: normalizeClass([_ctx.$style.metricItem, "mb-xs"])
          }, [
            createVNode(unref(N8nInput), {
              ref_for: true,
              ref: "metric",
              "data-test-id": "evaluation-metric-item",
              "model-value": metric.name,
              placeholder: unref(locale).baseText("testDefinition.edit.metricsPlaceholder"),
              "onUpdate:modelValue": (value) => updateMetric(index, value)
            }, null, 8, ["model-value", "placeholder", "onUpdate:modelValue"]),
            createVNode(unref(_sfc_main$a), {
              icon: "trash",
              type: "secondary",
              text: "",
              onClick: ($event) => onDeleteMetric(metric, index)
            }, null, 8, ["onClick"])
          ], 2);
        }), 128)),
        createVNode(unref(N8nButton), {
          type: "secondary",
          label: unref(locale).baseText("testDefinition.edit.metricsNew"),
          onClick: addNewMetric
        }, null, 8, ["label"])
      ]);
    };
  }
});
const metricItem = "_metricItem_1hbcq_123";
const style0$5 = {
  metricItem
};
const cssModules$5 = {
  "$style": style0$5
};
const MetricsInput = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__cssModules", cssModules$5]]);
const _hoisted_1$3 = { class: "mt-xs" };
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "WorkflowSelector",
  props: {
    modelValue: { default: () => ({
      mode: "id",
      value: "",
      __rl: true
    }) },
    examplePinnedData: { default: () => ({}) },
    sampleWorkflowName: { default: void 0 }
  },
  emits: ["update:modelValue", "workflowCreated"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const locale = useI18n();
    const projectStore = useProjectsStore();
    const workflowsStore = useWorkflowsStore();
    const router = useRouter();
    const subworkflowName = computed(() => {
      if (props.sampleWorkflowName) {
        return locale.baseText("testDefinition.workflowInput.subworkflowName", {
          interpolate: { name: props.sampleWorkflowName }
        });
      }
      return locale.baseText("testDefinition.workflowInput.subworkflowName.default");
    });
    const sampleWorkflow = computed(() => {
      return {
        ...SAMPLE_EVALUATION_WORKFLOW,
        name: subworkflowName.value,
        pinData: props.examplePinnedData
      };
    });
    const selectorVisible = ref(false);
    const updateModelValue = (value) => emit("update:modelValue", value);
    const handleDefineEvaluation = async () => {
      const projectId = projectStore.currentProjectId;
      const workflowName = sampleWorkflow.value.name ?? "My Sub-Workflow";
      const sampleSubWorkflows = workflowsStore.allWorkflows.filter(
        (w) => w.name && new RegExp(workflowName).test(w.name)
      );
      const workflow = {
        ...sampleWorkflow.value,
        name: `${workflowName} ${sampleSubWorkflows.length + 1}`
      };
      if (projectId) {
        workflow.projectId = projectId;
      }
      const newWorkflow = await workflowsStore.createNewWorkflow(workflow);
      const { href } = router.resolve({ name: VIEWS.WORKFLOW, params: { name: newWorkflow.id } });
      updateModelValue({
        ...props.modelValue,
        value: newWorkflow.id,
        cachedResultName: workflow.name
      });
      window.open(href, "_blank");
    };
    return (_ctx, _cache) => {
      const _component_WorkflowSelectorParameterInput = __unplugin_components_0$2;
      return openBlock(), createElementBlock("div", _hoisted_1$3, [
        !_ctx.modelValue.value ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
          createVNode(unref(N8nButton), {
            type: "secondary",
            class: "mb-xs",
            onClick: handleDefineEvaluation
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(unref(locale).baseText("testDefinition.workflow.createNew")), 1)
            ]),
            _: 1
          }),
          createVNode(unref(N8nLink), {
            class: "mb-xs",
            style: { "display": "block" },
            onClick: _cache[0] || (_cache[0] = ($event) => selectorVisible.value = !selectorVisible.value)
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(unref(locale).baseText("testDefinition.workflow.createNew.or")), 1)
            ]),
            _: 1
          })
        ], 64)) : createCommentVNode("", true),
        _ctx.modelValue.value || selectorVisible.value ? (openBlock(), createBlock(_component_WorkflowSelectorParameterInput, {
          key: 1,
          parameter: {
            displayName: unref(locale).baseText("testDefinition.edit.workflowSelectorDisplayName"),
            name: "workflowId",
            type: "workflowSelector",
            default: ""
          },
          "model-value": _ctx.modelValue,
          "display-title": unref(locale).baseText("testDefinition.edit.workflowSelectorTitle"),
          "is-value-expression": false,
          "expression-edit-dialog-visible": false,
          path: "workflows",
          "allow-new": false,
          "sample-workflow": sampleWorkflow.value,
          "new-resource-label": unref(locale).baseText("testDefinition.workflow.createNew"),
          "onUpdate:modelValue": updateModelValue,
          onWorkflowCreated: _cache[1] || (_cache[1] = ($event) => emit("workflowCreated", $event))
        }, null, 8, ["parameter", "model-value", "display-title", "sample-workflow", "new-resource-label"])) : createCommentVNode("", true)
      ]);
    };
  }
});
const _hoisted_1$2 = { style: { "display": "flex", "flex-direction": "column" } };
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "ConfigSection",
  props: /* @__PURE__ */ mergeModels({
    tagsById: {},
    isLoading: { type: Boolean },
    examplePinnedData: {},
    sampleWorkflowName: {},
    hasRuns: { type: Boolean },
    getFieldIssues: { type: Function },
    startEditing: { type: Function },
    saveChanges: { type: Function },
    cancelEditing: { type: Function }
  }, {
    "tags": { required: true },
    "tagsModifiers": {},
    "evaluationWorkflow": { required: true },
    "evaluationWorkflowModifiers": {},
    "metrics": { required: true },
    "metricsModifiers": {},
    "mockedNodes": {
      required: true
    },
    "mockedNodesModifiers": {}
  }),
  emits: /* @__PURE__ */ mergeModels(["openPinningModal", "deleteMetric", "openExecutionsViewForTag", "renameTag", "evaluationWorkflowCreated"], ["update:tags", "update:evaluationWorkflow", "update:metrics", "update:mockedNodes"]),
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const locale = useI18n();
    const tags = useModel(__props, "tags");
    const renameTag = async () => {
      const { prompt } = useMessage();
      const result = await prompt(locale.baseText("testDefinition.edit.step.tag.placeholder"), {
        inputValue: props.tagsById[tags.value.value[0]]?.name,
        inputPlaceholder: locale.baseText("testDefinition.edit.step.tag.placeholder"),
        inputValidator: (value) => {
          if (!value) {
            return locale.baseText("testDefinition.edit.step.tag.validation.required");
          }
          if (value.length > 21) {
            return locale.baseText("testDefinition.edit.step.tag.validation.tooLong");
          }
          return true;
        }
      });
      if (result?.action === "confirm") {
        emit("renameTag", result.value);
      }
    };
    const evaluationWorkflow = useModel(
      __props,
      "evaluationWorkflow"
    );
    const metrics = useModel(__props, "metrics");
    const mockedNodes = useModel(__props, "mockedNodes");
    const nodePinningModal = ref(null);
    const selectedTag = computed(() => props.tagsById[tags.value.value[0]] ?? {});
    function openExecutionsView() {
      emit("openExecutionsViewForTag");
    }
    return (_ctx, _cache) => {
      const _component_font_awesome_icon = resolveComponent("font-awesome-icon");
      const _component_i18n_t = resolveComponent("i18n-t");
      const _component_N8nHeading = resolveComponent("N8nHeading");
      const _component_NodesPinning = __unplugin_components_0;
      const _component_Modal = __unplugin_components_1;
      return openBlock(), createElementBlock("div", null, [
        createBaseVNode("div", {
          class: normalizeClass(_ctx.$style.editForm)
        }, [
          !_ctx.hasRuns ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
            createVNode(unref(N8nText), {
              tag: "div",
              color: "text-dark",
              size: "large",
              class: "text-center"
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(unref(locale).baseText("testDefinition.edit.step.intro")), 1)
              ]),
              _: 1
            }),
            createVNode(BlockArrow, { class: "mt-5xs mb-5xs" })
          ], 64)) : createCommentVNode("", true),
          createVNode(EvaluationStep, {
            issues: _ctx.getFieldIssues("tags"),
            tooltip: unref(locale).baseText("testDefinition.edit.step.executions.tooltip"),
            "external-tooltip": !_ctx.hasRuns
          }, {
            title: withCtx(() => [
              createTextVNode(toDisplayString(unref(locale).baseText("testDefinition.edit.step.executions", {
                adjustToNumber: selectedTag.value?.usageCount ?? 0
              })), 1)
            ]),
            cardContent: withCtx(() => [
              createBaseVNode("div", {
                class: normalizeClass(_ctx.$style.tagInputTag)
              }, [
                createVNode(_component_i18n_t, { keypath: "testDefinition.edit.step.tag" }, {
                  tag: withCtx(() => [
                    createVNode(unref(Tag), {
                      text: selectedTag.value.name,
                      clickable: true,
                      onClick: renameTag
                    }, {
                      tag: withCtx(() => [
                        createTextVNode(toDisplayString(selectedTag.value.name) + " ", 1),
                        createVNode(_component_font_awesome_icon, {
                          icon: "pen",
                          size: "sm"
                        })
                      ]),
                      _: 1
                    }, 8, ["text"])
                  ]),
                  _: 1
                })
              ], 2),
              createVNode(unref(N8nButton), {
                label: "Select executions",
                type: "tertiary",
                size: "small",
                onClick: openExecutionsView
              })
            ]),
            _: 1
          }, 8, ["issues", "tooltip", "external-tooltip"]),
          createBaseVNode("div", {
            class: normalizeClass(_ctx.$style.nestedSteps)
          }, [
            createVNode(BlockArrow, { class: "mt-5xs mb-5xs" }),
            createBaseVNode("div", _hoisted_1$2, [
              createVNode(BlockArrow, { class: "mt-5xs mb-5xs ml-auto mr-2xl" }),
              createVNode(EvaluationStep, {
                issues: _ctx.getFieldIssues("mockedNodes"),
                tooltip: unref(locale).baseText("testDefinition.edit.step.nodes.tooltip"),
                "external-tooltip": !_ctx.hasRuns
              }, {
                title: withCtx(() => [
                  createTextVNode(toDisplayString(unref(locale).baseText("testDefinition.edit.step.mockedNodes", {
                    adjustToNumber: mockedNodes.value?.length ?? 0
                  })) + " ", 1),
                  createVNode(unref(N8nText), null, {
                    default: withCtx(() => [
                      createTextVNode("(" + toDisplayString(unref(locale).baseText("generic.optional")) + ")", 1)
                    ]),
                    _: 1
                  })
                ]),
                cardContent: withCtx(() => [
                  createVNode(unref(N8nButton), {
                    size: "small",
                    "data-test-id": "select-nodes-button",
                    label: unref(locale).baseText("testDefinition.edit.selectNodes"),
                    type: "tertiary",
                    onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("openPinningModal"))
                  }, null, 8, ["label"])
                ]),
                _: 1
              }, 8, ["issues", "tooltip", "external-tooltip"]),
              createVNode(BlockArrow, { class: "mt-5xs mb-5xs ml-auto mr-2xl" }),
              createVNode(EvaluationStep, {
                title: unref(locale).baseText("testDefinition.edit.step.reRunExecutions"),
                tooltip: unref(locale).baseText("testDefinition.edit.step.reRunExecutions.tooltip"),
                "external-tooltip": !_ctx.hasRuns
              }, null, 8, ["title", "tooltip", "external-tooltip"]),
              createVNode(BlockArrow, { class: "mt-5xs mb-5xs ml-auto mr-2xl" })
            ])
          ], 2),
          createVNode(EvaluationStep, {
            title: unref(locale).baseText("testDefinition.edit.step.compareExecutions"),
            description: unref(locale).baseText("testDefinition.edit.workflowSelectorLabel"),
            issues: _ctx.getFieldIssues("evaluationWorkflow"),
            tooltip: unref(locale).baseText("testDefinition.edit.step.compareExecutions.tooltip"),
            "external-tooltip": !_ctx.hasRuns
          }, {
            cardContent: withCtx(() => [
              createVNode(_sfc_main$5, {
                modelValue: evaluationWorkflow.value,
                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => evaluationWorkflow.value = $event),
                "example-pinned-data": _ctx.examplePinnedData,
                class: normalizeClass({ "has-issues": _ctx.getFieldIssues("evaluationWorkflow").length > 0 }),
                "sample-workflow-name": _ctx.sampleWorkflowName,
                onWorkflowCreated: _cache[2] || (_cache[2] = ($event) => _ctx.$emit("evaluationWorkflowCreated", $event))
              }, null, 8, ["modelValue", "example-pinned-data", "class", "sample-workflow-name"])
            ]),
            _: 1
          }, 8, ["title", "description", "issues", "tooltip", "external-tooltip"]),
          createVNode(BlockArrow, { class: "mt-5xs mb-5xs" }),
          createVNode(EvaluationStep, {
            title: unref(locale).baseText("testDefinition.edit.step.metrics"),
            issues: _ctx.getFieldIssues("metrics"),
            description: unref(locale).baseText("testDefinition.edit.step.metrics.description"),
            tooltip: unref(locale).baseText("testDefinition.edit.step.metrics.tooltip"),
            "external-tooltip": !_ctx.hasRuns
          }, {
            cardContent: withCtx(() => [
              createVNode(MetricsInput, {
                modelValue: metrics.value,
                "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => metrics.value = $event),
                class: normalizeClass([{ "has-issues": _ctx.getFieldIssues("metrics").length > 0 }, "mt-xs"]),
                onDeleteMetric: _cache[4] || (_cache[4] = (metric) => emit("deleteMetric", metric))
              }, null, 8, ["modelValue", "class"])
            ]),
            _: 1
          }, 8, ["title", "issues", "description", "tooltip", "external-tooltip"])
        ], 2),
        createVNode(_component_Modal, {
          ref_key: "nodePinningModal",
          ref: nodePinningModal,
          width: "80vw",
          height: "85vh",
          name: unref(NODE_PINNING_MODAL_KEY)
        }, {
          header: withCtx(() => [
            createVNode(_component_N8nHeading, {
              size: "large",
              bold: true
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(unref(locale).baseText("testDefinition.edit.selectNodes")), 1)
              ]),
              _: 1
            }),
            _cache[6] || (_cache[6] = createBaseVNode("br", null, null, -1)),
            createVNode(unref(N8nText), null, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(unref(locale).baseText("testDefinition.edit.modal.description")), 1)
              ]),
              _: 1
            })
          ]),
          content: withCtx(() => [
            createVNode(_component_NodesPinning, {
              modelValue: mockedNodes.value,
              "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => mockedNodes.value = $event),
              "data-test-id": "nodes-pinning-modal"
            }, null, 8, ["modelValue"])
          ]),
          _: 1
        }, 8, ["name"])
      ]);
    };
  }
});
const nestedSteps = "_nestedSteps_1784n_123";
const tagInputTag = "_tagInputTag_1784n_128";
const style0$4 = {
  nestedSteps,
  tagInputTag
};
const cssModules$4 = {
  "$style": style0$4
};
const ConfigSection = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__cssModules", cssModules$4]]);
const THEME_COLORS = {
  light: {
    primary: "rgb(255, 110, 92)",
    text: {
      primary: "rgb(68, 68, 68)",
      secondary: "rgb(102, 102, 102)"
    },
    background: "rgb(255, 255, 255)",
    grid: "rgba(68, 68, 68, 0.1)"
  },
  dark: {
    primary: "rgb(255, 110, 92)",
    text: {
      primary: "rgb(255, 255, 255)",
      secondary: "rgba(255, 255, 255, 0.7)"
    },
    background: "rgb(32, 32, 32)",
    grid: "rgba(255, 255, 255, 0.1)"
  }
};
function useMetricsChart(mode = "light") {
  const colors = THEME_COLORS[mode];
  const toRGBA = (color, alpha) => {
    if (color.includes("rgba")) return color;
    return color.replace("rgb", "rgba").replace(")", `, ${alpha})`);
  };
  function generateChartData(runs2, metric) {
    const sortedRuns = [...runs2].sort((a, b) => new Date(a.runAt).getTime() - new Date(b.runAt).getTime()).filter((run) => run.metrics?.[metric]);
    return {
      labels: sortedRuns.map((run) => {
        return dateFormat(run.runAt, "yyyy-mm-dd HH:MM");
      }),
      datasets: [
        {
          label: metric,
          data: sortedRuns.map((run) => run.metrics?.[metric] ?? 0),
          borderColor: colors.primary,
          backgroundColor: toRGBA(colors.primary, 0.1),
          borderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6,
          pointBackgroundColor: colors.primary,
          pointBorderColor: colors.primary,
          pointHoverBackgroundColor: colors.background,
          pointHoverBorderColor: colors.primary,
          tension: 0.4,
          fill: true
        }
      ]
    };
  }
  function generateChartOptions(params) {
    return {
      responsive: true,
      maintainAspectRatio: false,
      devicePixelRatio: 2,
      interaction: {
        mode: "index",
        intersect: false
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: colors.grid
          },
          ticks: {
            padding: 8,
            color: colors.text.primary
          },
          title: {
            display: false,
            text: params.metric,
            padding: 16,
            color: colors.text.primary
          }
        },
        x: {
          grid: {
            display: false
          },
          ticks: {
            display: false
          },
          title: {
            text: params.xTitle,
            padding: 1,
            color: colors.text.primary
          }
        }
      },
      plugins: {
        tooltip: {
          backgroundColor: colors.background,
          titleColor: colors.text.primary,
          titleFont: {
            weight: "600"
          },
          bodyColor: colors.text.secondary,
          bodySpacing: 4,
          padding: 12,
          borderColor: toRGBA(colors.primary, 0.2),
          borderWidth: 1,
          displayColors: true,
          callbacks: {
            title: (tooltipItems) => tooltipItems[0].label,
            label: (context) => `${params.metric}: ${context.parsed.y.toFixed(2)}`
          }
        },
        legend: {
          display: false
        }
      },
      animation: {
        duration: 750,
        easing: "easeInOutQuart"
      },
      transitions: {
        active: {
          animation: {
            duration: 300
          }
        }
      }
    };
  }
  return {
    generateChartData,
    generateChartOptions
  };
}
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "MetricsChart",
  props: {
    selectedMetric: {},
    runs: {},
    theme: {}
  },
  emits: ["update:selectedMetric"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const props = __props;
    const locale = useI18n();
    const metricsChart = useMetricsChart(props.theme);
    const availableMetrics = computed(() => {
      return props.runs.reduce((acc, run) => {
        const metricKeys = Object.keys(run.metrics ?? {});
        return [.../* @__PURE__ */ new Set([...acc, ...metricKeys])];
      }, []);
    });
    const chartData = computed(() => metricsChart.generateChartData(props.runs, props.selectedMetric));
    const chartOptions = computed(
      () => metricsChart.generateChartOptions({
        metric: props.selectedMetric,
        xTitle: locale.baseText("testDefinition.listRuns.runDate")
      })
    );
    watchEffect(() => {
      if (props.runs.length > 0 && !props.selectedMetric) {
        emit("update:selectedMetric", availableMetrics.value[0]);
      }
    });
    return (_ctx, _cache) => {
      const _component_N8nOption = resolveComponent("N8nOption");
      const _component_N8nSelect = resolveComponent("N8nSelect");
      return availableMetrics.value.length > 0 ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: normalizeClass(_ctx.$style.metricsChartContainer)
      }, [
        createBaseVNode("div", {
          class: normalizeClass(_ctx.$style.chartHeader)
        }, [
          createVNode(_component_N8nSelect, {
            "model-value": _ctx.selectedMetric,
            class: normalizeClass(_ctx.$style.metricSelect),
            placeholder: "Select metric",
            size: "small",
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => emit("update:selectedMetric", $event))
          }, {
            default: withCtx(() => [
              (openBlock(true), createElementBlock(Fragment, null, renderList(availableMetrics.value, (metric) => {
                return openBlock(), createBlock(_component_N8nOption, {
                  key: metric,
                  label: metric,
                  value: metric
                }, null, 8, ["label", "value"]);
              }), 128))
            ]),
            _: 1
          }, 8, ["model-value", "class"])
        ], 2),
        createBaseVNode("div", {
          class: normalizeClass(_ctx.$style.chartWrapper)
        }, [
          availableMetrics.value.length > 0 ? (openBlock(), createBlock(unref(Line), {
            key: _ctx.selectedMetric,
            data: chartData.value,
            options: chartOptions.value,
            class: normalizeClass(_ctx.$style.metricsChart)
          }, null, 8, ["data", "options", "class"])) : createCommentVNode("", true)
        ], 2)
      ], 2)) : createCommentVNode("", true);
    };
  }
});
const metricsChartContainer = "_metricsChartContainer_1ejem_123";
const chartHeader = "_chartHeader_1ejem_128";
const chartTitle = "_chartTitle_1ejem_136";
const metricSelect = "_metricSelect_1ejem_141";
const chartWrapper = "_chartWrapper_1ejem_144";
const style0$3 = {
  metricsChartContainer,
  chartHeader,
  chartTitle,
  metricSelect,
  chartWrapper
};
const cssModules$3 = {
  "$style": style0$3
};
const MetricsChart = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__cssModules", cssModules$3]]);
const _hoisted_1$1 = { style: { "display": "inline-flex", "gap": "8px", "text-transform": "capitalize", "align-items": "center" } };
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "TestRunsTable",
  props: {
    runs: {},
    columns: {},
    selectable: { type: Boolean }
  },
  emits: ["rowClick", "selectionChange", "deleteRuns"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const props = __props;
    const statusesColorDictionary = {
      new: "var(--color-primary)",
      running: "var(--color-secondary)",
      completed: "var(--color-success)",
      error: "var(--color-danger)",
      cancelled: "var(--color-foreground-dark)",
      warning: "var(--color-warning)",
      success: "var(--color-success)"
    };
    const locale = useI18n();
    const selectedRows = ref([]);
    const runSummaries = computed(() => {
      return props.runs.map(({ status, finalResult, ...run }) => {
        if (status === "completed" && finalResult) {
          return { ...run, status: finalResult };
        }
        return { ...run, status };
      });
    });
    function onSelectionChange(runs2) {
      selectedRows.value = runs2;
      emit("selectionChange", runs2);
    }
    async function deleteRuns() {
      emit("deleteRuns", selectedRows.value);
    }
    return (_ctx, _cache) => {
      const _component_N8nHeading = resolveComponent("N8nHeading");
      const _component_n8n_button = resolveComponent("n8n-button");
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(_ctx.$style.container)
      }, [
        createVNode(_component_N8nHeading, {
          size: "large",
          bold: true,
          class: normalizeClass(_ctx.$style.runsTableHeading)
        }, {
          default: withCtx(() => [
            createTextVNode(toDisplayString(unref(locale).baseText("testDefinition.edit.pastRuns.total", { adjustToNumber: _ctx.runs.length })), 1)
          ]),
          _: 1
        }, 8, ["class"]),
        createBaseVNode("div", {
          class: normalizeClass(_ctx.$style.header)
        }, [
          withDirectives(createVNode(_component_n8n_button, {
            type: "danger",
            class: normalizeClass(_ctx.$style.activator),
            size: "medium",
            icon: "trash",
            "data-test-id": "delete-runs-button",
            onClick: deleteRuns
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(unref(locale).baseText("testDefinition.listRuns.deleteRuns", {
                adjustToNumber: selectedRows.value.length
              })), 1)
            ]),
            _: 1
          }, 8, ["class"]), [
            [vShow, selectedRows.value.length > 0]
          ])
        ], 2),
        createVNode(TestTableBase, {
          data: runSummaries.value,
          columns: _ctx.columns,
          selectable: "",
          "default-sort": { prop: "runAt", order: "descending" },
          onRowClick: _cache[0] || (_cache[0] = (row) => emit("rowClick", row)),
          onSelectionChange
        }, {
          status: withCtx(({ row }) => [
            createBaseVNode("div", _hoisted_1$1, [
              createVNode(unref(N8nIcon), {
                icon: "circle",
                size: "xsmall",
                style: normalizeStyle({ color: statusesColorDictionary[row.status] })
              }, null, 8, ["style"]),
              row.status === "error" ? (openBlock(), createBlock(unref(N8nText), {
                key: 0,
                size: "small",
                bold: "",
                color: "text-base"
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(row.failedCases) + " / " + toDisplayString(row.totalCases) + " " + toDisplayString(row.status), 1)
                ]),
                _: 2
              }, 1024)) : (openBlock(), createBlock(unref(N8nText), {
                key: 1,
                size: "small",
                bold: "",
                color: "text-base"
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(row.status), 1)
                ]),
                _: 2
              }, 1024))
            ])
          ]),
          _: 1
        }, 8, ["data", "columns"])
      ], 2);
    };
  }
});
const container = "_container_fgn23_123";
const style0$2 = {
  container
};
const cssModules$2 = {
  "$style": style0$2
};
const TestRunsTable = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__cssModules", cssModules$2]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "RunsSection",
  props: /* @__PURE__ */ mergeModels({
    runs: {},
    testId: {},
    appliedTheme: {}
  }, {
    "selectedMetric": { required: true },
    "selectedMetricModifiers": {}
  }),
  emits: /* @__PURE__ */ mergeModels(["deleteRuns"], ["update:selectedMetric"]),
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const locale = useI18n();
    const router = useRouter();
    const selectedMetric = useModel(__props, "selectedMetric");
    function onDeleteRuns(toDelete) {
      emit("deleteRuns", toDelete);
    }
    const metrics = computed(() => {
      const metricKeys = props.runs.reduce((acc, run) => {
        Object.keys(run.metrics ?? {}).forEach((metric) => acc.add(metric));
        return acc;
      }, /* @__PURE__ */ new Set());
      return [...metricKeys];
    });
    const metricColumns = computed(
      () => metrics.value.map((metric) => ({
        prop: `metrics.${metric}`,
        label: metric,
        sortable: true,
        showHeaderTooltip: true,
        sortMethod: (a, b) => (a.metrics?.[metric] ?? 0) - (b.metrics?.[metric] ?? 0),
        formatter: (row) => (row.metrics?.[metric] ?? 0).toFixed(2)
      }))
    );
    const columns = computed(() => [
      {
        prop: "runNumber",
        label: locale.baseText("testDefinition.listRuns.runNumber"),
        formatter: (row) => `${row.id}`,
        showOverflowTooltip: true
      },
      {
        prop: "runAt",
        label: "Run at",
        sortable: true,
        showOverflowTooltip: true,
        sortMethod: (a, b) => new Date(a.runAt ?? a.createdAt).getTime() - new Date(b.runAt ?? b.createdAt).getTime()
      },
      {
        prop: "status",
        label: locale.baseText("testDefinition.listRuns.status"),
        sortable: true
      },
      ...metricColumns.value
    ]);
    const handleRowClick = (row) => {
      void router.push({
        name: VIEWS.TEST_DEFINITION_RUNS_DETAIL,
        params: { testId: row.testDefinitionId, runId: row.id }
      });
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(_ctx.$style.runs)
      }, [
        createVNode(MetricsChart, {
          selectedMetric: selectedMetric.value,
          "onUpdate:selectedMetric": _cache[0] || (_cache[0] = ($event) => selectedMetric.value = $event),
          runs: _ctx.runs,
          theme: _ctx.appliedTheme
        }, null, 8, ["selectedMetric", "runs", "theme"]),
        createVNode(TestRunsTable, {
          class: normalizeClass(_ctx.$style.runsTable),
          runs: _ctx.runs,
          columns: columns.value,
          selectable: true,
          "data-test-id": "past-runs-table",
          onDeleteRuns,
          onRowClick: handleRowClick
        }, null, 8, ["class", "runs", "columns"])
      ], 2);
    };
  }
});
const runs = "_runs_gua3g_123";
const style0$1 = {
  runs
};
const cssModules$1 = {
  "$style": style0$1
};
const RunsSection = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__cssModules", cssModules$1]]);
const _hoisted_1 = { style: { "display": "flex", "align-items": "center" } };
const _hoisted_2 = { style: { "display": "flex", "align-items": "center", "gap": "10px" } };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "TestDefinitionEditView",
  props: {
    testId: {},
    name: {}
  },
  setup(__props) {
    const props = __props;
    const router = useRouter();
    const locale = useI18n();
    const { debounce } = useDebounce();
    const toast = useToast();
    const testDefinitionStore = useTestDefinitionStore();
    const tagsStore = useAnnotationTagsStore();
    const uiStore = useUIStore();
    const workflowStore = useWorkflowsStore();
    const telemetry = useTelemetry();
    const visibility = useDocumentVisibility();
    watch(visibility, async () => {
      if (visibility.value !== "visible") return;
      await tagsStore.fetchAll({ force: true, withUsageCount: true });
      await getExamplePinnedDataForTags();
      testDefinitionStore.updateRunFieldIssues(props.testId);
    });
    const {
      state,
      isSaving,
      cancelEditing,
      loadTestData,
      updateTest,
      startEditing,
      saveChanges,
      deleteMetric,
      updateMetrics
    } = useTestDefinitionForm();
    const isLoading = computed(() => tagsStore.isLoading);
    const tagsById = computed(() => tagsStore.tagsById);
    const currentWorkflowId = computed(() => props.name);
    const appliedTheme = computed(() => uiStore.appliedTheme);
    const workflowName = computed(() => workflowStore.workflow.name);
    const hasRuns = computed(() => runs2.value.length > 0);
    const fieldsIssues = computed(() => testDefinitionStore.getFieldIssues(props.testId) ?? []);
    const showConfig = ref(true);
    const selectedMetric = ref("");
    const examplePinnedData = ref({});
    void loadTestData(props.testId, props.name);
    const handleUpdateTest = async () => {
      try {
        await updateTest(props.testId);
      } catch (e) {
        toast.showError(e, locale.baseText("testDefinition.edit.testSaveFailed"));
      }
    };
    const handleUpdateTestDebounced = debounce(handleUpdateTest, { debounceTime: 400, trailing: true });
    const handleUpdateMetricsDebounced = debounce(
      async (testId) => {
        await updateMetrics(testId);
        testDefinitionStore.updateRunFieldIssues(testId);
      },
      { debounceTime: 400, trailing: true }
    );
    function getFieldIssues(key) {
      return fieldsIssues.value.filter((issue) => issue.field === key);
    }
    async function onDeleteMetric(deletedMetric) {
      await deleteMetric(deletedMetric.id, props.testId);
    }
    async function openPinningModal() {
      uiStore.openModal(NODE_PINNING_MODAL_KEY);
    }
    async function runTest() {
      await testDefinitionStore.startTestRun(props.testId);
      await testDefinitionStore.fetchTestRuns(props.testId);
    }
    async function openExecutionsViewForTag() {
      const executionsRoute = router.resolve({
        name: VIEWS.WORKFLOW_EXECUTIONS,
        params: { name: currentWorkflowId.value },
        query: { tag: state.value.tags.value[0], testId: props.testId }
      });
      window.open(executionsRoute.href, "_blank");
    }
    const runs2 = computed(
      () => Object.values(testDefinitionStore.testRunsById ?? {}).filter(
        (run) => run.testDefinitionId === props.testId
      )
    );
    const isRunning = computed(() => runs2.value.some((run) => run.status === "running"));
    const isRunTestEnabled = computed(() => fieldsIssues.value.length === 0 && !isRunning.value);
    async function onDeleteRuns(toDelete) {
      await Promise.all(
        toDelete.map(async (run) => {
          await testDefinitionStore.deleteTestRun({ testDefinitionId: props.testId, runId: run.id });
        })
      );
    }
    async function renameTag(newName) {
      await tagsStore.rename({ id: state.value.tags.value[0], name: newName });
    }
    async function getExamplePinnedDataForTags() {
      const exampleInput = await testDefinitionStore.fetchExampleEvaluationInput(
        props.testId,
        state.value.tags.value[0]
      );
      if (exampleInput !== null) {
        examplePinnedData.value = {
          "When called by a test run": [
            {
              json: exampleInput
            }
          ]
        };
      }
    }
    watch(() => state.value.tags, getExamplePinnedDataForTags);
    const updateName = (value) => {
      state.value.name.value = value;
      void handleUpdateTestDebounced();
    };
    const updateDescription = (value) => {
      state.value.description.value = value;
      void handleUpdateTestDebounced();
    };
    function onEvaluationWorkflowCreated(workflowId) {
      telemetry.track("User created evaluation workflow from test", {
        test_id: props.testId,
        subworkflow_id: workflowId
      });
    }
    return (_ctx, _cache) => {
      const _component_N8nTooltip = resolveComponent("N8nTooltip");
      return !isLoading.value ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: normalizeClass([_ctx.$style.container])
      }, [
        createBaseVNode("div", {
          class: normalizeClass(_ctx.$style.header)
        }, [
          createBaseVNode("div", _hoisted_1, [
            createVNode(unref(_sfc_main$a), {
              icon: "arrow-left",
              type: "tertiary",
              text: "",
              onClick: _cache[0] || (_cache[0] = ($event) => unref(router).push({ name: unref(VIEWS).TEST_DEFINITION, params: { testId: _ctx.testId } }))
            }),
            createVNode(InlineNameEdit, {
              "model-value": unref(state).name.value,
              "max-height": "none",
              type: "Test name",
              "onUpdate:modelValue": updateName
            }, {
              default: withCtx(() => [
                createVNode(unref(N8nText), {
                  bold: "",
                  size: "xlarge",
                  color: "text-dark"
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(unref(state).name.value), 1)
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["model-value"])
          ]),
          createBaseVNode("div", _hoisted_2, [
            hasRuns.value ? (openBlock(), createBlock(unref(N8nText), {
              key: 0,
              color: "text-light",
              size: "small"
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(unref(isSaving) ? unref(locale).baseText("testDefinition.edit.saving") : unref(locale).baseText("testDefinition.edit.saved")), 1)
              ]),
              _: 1
            })) : createCommentVNode("", true),
            createVNode(_component_N8nTooltip, {
              disabled: isRunTestEnabled.value,
              placement: "left"
            }, {
              content: withCtx(() => [
                fieldsIssues.value.length > 0 ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                  createBaseVNode("div", null, toDisplayString(unref(locale).baseText("testDefinition.completeConfig")), 1),
                  (openBlock(true), createElementBlock(Fragment, null, renderList(fieldsIssues.value, (issue) => {
                    return openBlock(), createElementBlock("div", {
                      key: issue.field
                    }, "- " + toDisplayString(issue.message), 1);
                  }), 128))
                ], 64)) : createCommentVNode("", true),
                isRunning.value ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString(unref(locale).baseText("testDefinition.testIsRunning")), 1)
                ], 64)) : createCommentVNode("", true)
              ]),
              default: withCtx(() => [
                createVNode(unref(N8nButton), {
                  disabled: !isRunTestEnabled.value,
                  class: normalizeClass(_ctx.$style.runTestButton),
                  size: "small",
                  "data-test-id": "run-test-button",
                  label: unref(locale).baseText("testDefinition.runTest"),
                  type: "primary",
                  onClick: runTest
                }, null, 8, ["disabled", "class", "label"])
              ]),
              _: 1
            }, 8, ["disabled"])
          ])
        ], 2),
        createBaseVNode("div", {
          class: normalizeClass(_ctx.$style.wrapper)
        }, [
          createBaseVNode("div", {
            class: normalizeClass(_ctx.$style.description)
          }, [
            createVNode(InlineNameEdit, {
              "model-value": unref(state).description.value,
              placeholder: "Add a description...",
              required: false,
              autosize: { minRows: 1, maxRows: 3 },
              "input-type": "textarea",
              maxlength: 260,
              "max-height": "none",
              type: "Test description",
              "onUpdate:modelValue": updateDescription
            }, {
              default: withCtx(() => [
                createVNode(unref(N8nText), {
                  size: "medium",
                  color: "text-base"
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(unref(state).description.value), 1)
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["model-value"])
          ], 2),
          createBaseVNode("div", {
            class: normalizeClass({ [_ctx.$style.content]: true, [_ctx.$style.contentWithRuns]: hasRuns.value })
          }, [
            hasRuns.value ? (openBlock(), createBlock(RunsSection, {
              key: 0,
              selectedMetric: selectedMetric.value,
              "onUpdate:selectedMetric": _cache[1] || (_cache[1] = ($event) => selectedMetric.value = $event),
              class: normalizeClass(_ctx.$style.runs),
              runs: runs2.value,
              "test-id": _ctx.testId,
              "applied-theme": appliedTheme.value,
              onDeleteRuns
            }, null, 8, ["selectedMetric", "class", "runs", "test-id", "applied-theme"])) : createCommentVNode("", true),
            showConfig.value ? (openBlock(), createBlock(ConfigSection, {
              key: 1,
              tags: unref(state).tags,
              "onUpdate:tags": _cache[2] || (_cache[2] = ($event) => unref(state).tags = $event),
              evaluationWorkflow: unref(state).evaluationWorkflow,
              "onUpdate:evaluationWorkflow": [
                _cache[3] || (_cache[3] = ($event) => unref(state).evaluationWorkflow = $event),
                unref(handleUpdateTestDebounced)
              ],
              metrics: unref(state).metrics,
              "onUpdate:metrics": [
                _cache[4] || (_cache[4] = ($event) => unref(state).metrics = $event),
                _cache[6] || (_cache[6] = () => unref(handleUpdateMetricsDebounced)(_ctx.testId))
              ],
              mockedNodes: unref(state).mockedNodes,
              "onUpdate:mockedNodes": [
                _cache[5] || (_cache[5] = ($event) => unref(state).mockedNodes = $event),
                unref(handleUpdateTestDebounced)
              ],
              class: normalizeClass(_ctx.$style.config),
              "cancel-editing": unref(cancelEditing),
              "tags-by-id": tagsById.value,
              "is-loading": isLoading.value,
              "get-field-issues": getFieldIssues,
              "start-editing": unref(startEditing),
              "save-changes": unref(saveChanges),
              "has-runs": hasRuns.value,
              "example-pinned-data": examplePinnedData.value,
              "sample-workflow-name": workflowName.value,
              onRenameTag: renameTag,
              onOpenPinningModal: openPinningModal,
              onDeleteMetric,
              onOpenExecutionsViewForTag: openExecutionsViewForTag,
              onEvaluationWorkflowCreated: _cache[7] || (_cache[7] = ($event) => onEvaluationWorkflowCreated($event))
            }, null, 8, ["tags", "evaluationWorkflow", "metrics", "mockedNodes", "class", "cancel-editing", "tags-by-id", "is-loading", "start-editing", "save-changes", "has-runs", "example-pinned-data", "sample-workflow-name", "onUpdate:evaluationWorkflow", "onUpdate:mockedNodes"])) : createCommentVNode("", true)
          ], 2)
        ], 2)
      ], 2)) : createCommentVNode("", true);
    };
  }
});
const content = "_content_1o8sl_123";
const config = "_config_1o8sl_130";
const contentWithRuns = "_contentWithRuns_1o8sl_133";
const header = "_header_1o8sl_137";
const wrapper = "_wrapper_1o8sl_151";
const description = "_description_1o8sl_156";
const arrowBack = "_arrowBack_1o8sl_161";
const style0 = {
  content,
  config,
  contentWithRuns,
  header,
  wrapper,
  description,
  arrowBack
};
const cssModules = {
  "$style": style0
};
const TestDefinitionEditView = /* @__PURE__ */ _export_sfc(_sfc_main, [["__cssModules", cssModules]]);
export {
  TestDefinitionEditView as default
};
