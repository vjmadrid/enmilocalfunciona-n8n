import { d as defineComponent, m as resolveComponent, c as openBlock, e as createBlock, w as withCtx, f as createCommentVNode, k as createTextVNode, t as toDisplayString, i as createVNode, n as normalizeClass, l as unref, v as renderSlot, g as useI18n, _ as _export_sfc, ab as useCssModule, r as ref, q as computed, fF as WAIT_INDEFINITELY, c_ as i18n, h as createElementBlock, j as createBaseVNode, J as withModifiers, U as useWorkflowsStore, at as useExecutionsStore, p as useSettingsStore, a6 as usePageRedirectionHelper, a as useToast, a9 as EnterpriseEditionFeature, I as watch, o as onMounted, ax as withDirectives, ay as vShow, F as Fragment, B as renderList, bS as TransitionGroup, af as MODAL_CONFIRM, am as getResourcePermissions, ak as useTelemetry, al as useMessage, W as useRoute, a4 as useDocumentTitle, cn as storeToRefs, aw as onBeforeMount, y as onBeforeUnmount, aU as useExternalHooks } from "./index-DkwrpQEB.js";
import { _ as _sfc_main$4, C as ConcurrentExecutionsHeader, E as ExecutionsFilter } from "./ConcurrentExecutionsHeader-Ddh95eQk.js";
import { u as useExecutionHelpers, c as convertToDisplayDate } from "./useExecutionHelpers-DTlfzIbO.js";
import { P as ProjectHeader } from "./ProjectHeader-DyqSSbiB.js";
import "./AnnotationTagsDropdown.ee.vue_vue_type_script_setup_true_lang-CVAPh1f-.js";
import "./ProjectCreateResource-CtheSWks.js";
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "GlobalExecutionsListItemQueuedTooltip",
  props: {
    status: {},
    concurrencyCap: {},
    isCloudDeployment: { type: Boolean }
  },
  emits: ["goToUpgrade"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const i18n2 = useI18n();
    return (_ctx, _cache) => {
      const _component_i18n_t = resolveComponent("i18n-t");
      const _component_N8nLink = resolveComponent("N8nLink");
      const _component_N8nTooltip = resolveComponent("N8nTooltip");
      return openBlock(), createBlock(_component_N8nTooltip, { placement: "top" }, {
        content: withCtx(() => [
          props.status === "waiting" ? (openBlock(), createBlock(_component_i18n_t, {
            key: 0,
            keypath: "executionsList.statusTooltipText.theWorkflowIsWaitingIndefinitely"
          })) : createCommentVNode("", true),
          props.status === "new" ? (openBlock(), createBlock(_component_i18n_t, {
            key: 1,
            keypath: "executionsList.statusTooltipText.waitingForConcurrencyCapacity"
          }, {
            instance: withCtx(() => [
              props.isCloudDeployment ? (openBlock(), createBlock(_component_i18n_t, {
                key: 0,
                keypath: "executionsList.statusTooltipText.waitingForConcurrencyCapacity.cloud"
              }, {
                concurrencyCap: withCtx(() => [
                  createTextVNode(toDisplayString(props.concurrencyCap), 1)
                ]),
                link: withCtx(() => [
                  createVNode(_component_N8nLink, {
                    bold: "",
                    size: "small",
                    class: normalizeClass(_ctx.$style.link),
                    onClick: _cache[0] || (_cache[0] = ($event) => emit("goToUpgrade"))
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(unref(i18n2).baseText("generic.upgradeNow")), 1)
                    ]),
                    _: 1
                  }, 8, ["class"])
                ]),
                _: 1
              })) : (openBlock(), createBlock(_component_i18n_t, {
                key: 1,
                keypath: "executionsList.statusTooltipText.waitingForConcurrencyCapacity.self"
              }, {
                concurrencyCap: withCtx(() => [
                  createTextVNode(toDisplayString(props.concurrencyCap), 1)
                ]),
                link: withCtx(() => [
                  createVNode(_component_N8nLink, {
                    class: normalizeClass(_ctx.$style.link),
                    href: unref(i18n2).baseText("executions.concurrency.docsLink"),
                    target: "_blank"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(unref(i18n2).baseText("generic.viewDocs")), 1)
                    ]),
                    _: 1
                  }, 8, ["class", "href"])
                ]),
                _: 1
              }))
            ]),
            _: 1
          })) : createCommentVNode("", true)
        ]),
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      });
    };
  }
});
const link$1 = "_link_1k41m_123";
const style0$2 = {
  link: link$1
};
const cssModules$2 = {
  "$style": style0$2
};
const GlobalExecutionsListItemQueuedTooltip = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__cssModules", cssModules$2]]);
const _hoisted_1$1 = { key: 0 };
const _hoisted_2 = { key: 1 };
const _hoisted_3 = { key: 0 };
const _hoisted_4 = { key: 1 };
const _hoisted_5 = { key: 2 };
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "GlobalExecutionsListItem",
  props: {
    execution: {},
    selected: { type: Boolean, default: false },
    workflowName: { default: "" },
    workflowPermissions: {},
    concurrencyCap: {},
    isCloudDeployment: { type: Boolean }
  },
  emits: ["stop", "select", "retrySaved", "retryOriginal", "delete", "goToUpgrade"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const props = __props;
    const style = useCssModule();
    const i18n$1 = useI18n();
    const executionHelpers = useExecutionHelpers();
    const isStopping = ref(false);
    const isRunning = computed(() => {
      return props.execution.status === "running";
    });
    const isQueued = computed(() => {
      return props.execution.status === "new";
    });
    const isWaitTillIndefinite = computed(() => {
      if (!props.execution.waitTill) {
        return false;
      }
      return new Date(props.execution.waitTill).getTime() === WAIT_INDEFINITELY.getTime();
    });
    const isRetriable = computed(() => executionHelpers.isExecutionRetriable(props.execution));
    const classes = computed(() => {
      return {
        [style.executionListItem]: true,
        [style[props.execution.status]]: true
      };
    });
    const formattedStartedAtDate = computed(() => {
      return props.execution.startedAt ? formatDate(props.execution.startedAt) : i18n$1.baseText("executionsList.startingSoon");
    });
    const formattedWaitTillDate = computed(() => {
      return props.execution.waitTill ? formatDate(props.execution.waitTill) : "";
    });
    const formattedStoppedAtDate = computed(() => {
      return props.execution.stoppedAt ? i18n$1.displayTimer(
        new Date(props.execution.stoppedAt).getTime() - new Date(props.execution.startedAt).getTime(),
        true
      ) : "";
    });
    const statusText = computed(() => {
      switch (props.execution.status) {
        case "waiting":
          return i18n$1.baseText("executionsList.waiting");
        case "canceled":
          return i18n$1.baseText("executionsList.canceled");
        case "crashed":
          return i18n$1.baseText("executionsList.error");
        case "new":
          return i18n$1.baseText("executionsList.new");
        case "running":
          return i18n$1.baseText("executionsList.running");
        case "success":
          return i18n$1.baseText("executionsList.succeeded");
        case "error":
          return i18n$1.baseText("executionsList.error");
        default:
          return i18n$1.baseText("executionsList.unknown");
      }
    });
    const statusTextTranslationPath = computed(() => {
      switch (props.execution.status) {
        case "waiting":
          return "executionsList.statusWaiting";
        case "canceled":
          return "executionsList.statusCanceled";
        case "crashed":
        case "error":
        case "success":
          if (!props.execution.stoppedAt) {
            return "executionsList.statusTextWithoutTime";
          } else {
            return "executionsList.statusText";
          }
        case "new":
          return "executionsList.statusTextWithoutTime";
        case "running":
          return "executionsList.statusRunning";
        default:
          return "executionsList.statusUnknown";
      }
    });
    function formatDate(fullDate) {
      const { date, time } = convertToDisplayDate(fullDate);
      return i18n.baseText("executionsList.started", { interpolate: { time, date } });
    }
    function displayExecution() {
      executionHelpers.openExecutionInNewTab(props.execution.id, props.execution.workflowId);
    }
    function onStopExecution() {
      isStopping.value = true;
      emit("stop", props.execution);
    }
    function onSelect() {
      emit("select", props.execution);
    }
    async function handleActionItemClick(commandData) {
      emit(commandData, props.execution);
    }
    return (_ctx, _cache) => {
      const _component_ElCheckbox = resolveComponent("ElCheckbox");
      const _component_FontAwesomeIcon = resolveComponent("FontAwesomeIcon");
      const _component_i18n_t = resolveComponent("i18n-t");
      const _component_N8nTooltip = resolveComponent("N8nTooltip");
      const _component_N8nButton = resolveComponent("N8nButton");
      const _component_N8nIconButton = resolveComponent("N8nIconButton");
      const _component_ElDropdownItem = resolveComponent("ElDropdownItem");
      const _component_ElDropdownMenu = resolveComponent("ElDropdownMenu");
      const _component_ElDropdown = resolveComponent("ElDropdown");
      return openBlock(), createElementBlock("tr", {
        class: normalizeClass(classes.value)
      }, [
        createBaseVNode("td", null, [
          !!_ctx.execution.stoppedAt && _ctx.execution.id ? (openBlock(), createBlock(_component_ElCheckbox, {
            key: 0,
            "model-value": _ctx.selected,
            label: "",
            "data-test-id": "select-execution-checkbox",
            "onUpdate:modelValue": onSelect
          }, null, 8, ["model-value"])) : createCommentVNode("", true)
        ]),
        createBaseVNode("td", null, [
          createBaseVNode("span", {
            class: normalizeClass(_ctx.$style.link),
            onClick: withModifiers(displayExecution, ["stop"])
          }, toDisplayString(_ctx.execution.workflowName || _ctx.workflowName), 3)
        ]),
        createBaseVNode("td", null, [
          createBaseVNode("span", null, toDisplayString(formattedStartedAtDate.value), 1)
        ]),
        createBaseVNode("td", null, [
          createBaseVNode("div", {
            class: normalizeClass(_ctx.$style.statusColumn)
          }, [
            isRunning.value ? (openBlock(), createElementBlock("span", {
              key: 0,
              class: normalizeClass(_ctx.$style.spinner)
            }, [
              createVNode(_component_FontAwesomeIcon, {
                icon: "spinner",
                spin: ""
              })
            ], 2)) : createCommentVNode("", true),
            !isWaitTillIndefinite.value && !isQueued.value ? (openBlock(), createBlock(_component_i18n_t, {
              key: 1,
              "data-test-id": "execution-status",
              tag: "span",
              keypath: statusTextTranslationPath.value
            }, {
              status: withCtx(() => [
                createBaseVNode("span", {
                  class: normalizeClass(_ctx.$style.status)
                }, toDisplayString(statusText.value), 3)
              ]),
              time: withCtx(() => [
                _ctx.execution.waitTill ? (openBlock(), createElementBlock("span", _hoisted_1$1, toDisplayString(formattedWaitTillDate.value), 1)) : !!_ctx.execution.stoppedAt ? (openBlock(), createElementBlock("span", _hoisted_2, toDisplayString(formattedStoppedAtDate.value), 1)) : _ctx.execution.status !== "new" ? (openBlock(), createBlock(_sfc_main$4, {
                  key: 2,
                  "start-time": _ctx.execution.startedAt
                }, null, 8, ["start-time"])) : createCommentVNode("", true)
              ]),
              _: 1
            }, 8, ["keypath"])) : (openBlock(), createBlock(GlobalExecutionsListItemQueuedTooltip, {
              key: 2,
              status: props.execution.status,
              "concurrency-cap": props.concurrencyCap,
              "is-cloud-deployment": props.isCloudDeployment,
              onGoToUpgrade: _cache[0] || (_cache[0] = ($event) => emit("goToUpgrade"))
            }, {
              default: withCtx(() => [
                createBaseVNode("span", {
                  class: normalizeClass(_ctx.$style.status)
                }, toDisplayString(statusText.value), 3)
              ]),
              _: 1
            }, 8, ["status", "concurrency-cap", "is-cloud-deployment"]))
          ], 2)
        ]),
        createBaseVNode("td", null, [
          _ctx.execution.id ? (openBlock(), createElementBlock("span", _hoisted_3, "#" + toDisplayString(_ctx.execution.id), 1)) : createCommentVNode("", true),
          _ctx.execution.retryOf ? (openBlock(), createElementBlock("span", _hoisted_4, [
            _cache[1] || (_cache[1] = createBaseVNode("br", null, null, -1)),
            createBaseVNode("small", null, " (" + toDisplayString(unref(i18n$1).baseText("executionsList.retryOf")) + " #" + toDisplayString(_ctx.execution.retryOf) + ") ", 1)
          ])) : _ctx.execution.retrySuccessId ? (openBlock(), createElementBlock("span", _hoisted_5, [
            _cache[2] || (_cache[2] = createBaseVNode("br", null, null, -1)),
            createBaseVNode("small", null, " (" + toDisplayString(unref(i18n$1).baseText("executionsList.successRetry")) + " #" + toDisplayString(_ctx.execution.retrySuccessId) + ") ", 1)
          ])) : createCommentVNode("", true)
        ]),
        createBaseVNode("td", null, [
          _ctx.execution.mode === "manual" ? (openBlock(), createBlock(_component_N8nTooltip, {
            key: 0,
            placement: "top"
          }, {
            content: withCtx(() => [
              createBaseVNode("span", null, toDisplayString(unref(i18n$1).baseText("executionsList.test")), 1)
            ]),
            default: withCtx(() => [
              createVNode(_component_FontAwesomeIcon, { icon: "flask" })
            ]),
            _: 1
          })) : createCommentVNode("", true),
          _ctx.execution.mode === "evaluation" ? (openBlock(), createBlock(_component_N8nTooltip, {
            key: 1,
            placement: "top"
          }, {
            content: withCtx(() => [
              createBaseVNode("span", null, toDisplayString(unref(i18n$1).baseText("executionsList.evaluation")), 1)
            ]),
            default: withCtx(() => [
              createVNode(_component_FontAwesomeIcon, { icon: "tasks" })
            ]),
            _: 1
          })) : createCommentVNode("", true)
        ]),
        createBaseVNode("td", null, [
          createBaseVNode("div", {
            class: normalizeClass(_ctx.$style.buttonCell)
          }, [
            !!_ctx.execution.stoppedAt && _ctx.execution.id ? (openBlock(), createBlock(_component_N8nButton, {
              key: 0,
              size: "small",
              outline: "",
              label: unref(i18n$1).baseText("executionsList.view"),
              onClick: withModifiers(displayExecution, ["stop"])
            }, null, 8, ["label"])) : createCommentVNode("", true)
          ], 2)
        ]),
        createBaseVNode("td", null, [
          createBaseVNode("div", {
            class: normalizeClass(_ctx.$style.buttonCell)
          }, [
            !_ctx.execution.stoppedAt || _ctx.execution.waitTill ? (openBlock(), createBlock(_component_N8nButton, {
              key: 0,
              "data-test-id": "stop-execution-button",
              size: "small",
              outline: "",
              label: unref(i18n$1).baseText("executionsList.stop"),
              loading: isStopping.value,
              onClick: withModifiers(onStopExecution, ["stop"])
            }, null, 8, ["label", "loading"])) : createCommentVNode("", true)
          ], 2)
        ]),
        createBaseVNode("td", null, [
          !isRunning.value ? (openBlock(), createBlock(_component_ElDropdown, {
            key: 0,
            trigger: "click",
            onCommand: handleActionItemClick
          }, {
            dropdown: withCtx(() => [
              createVNode(_component_ElDropdownMenu, {
                class: normalizeClass({
                  [_ctx.$style.actions]: true,
                  [_ctx.$style.deleteOnly]: !isRetriable.value
                })
              }, {
                default: withCtx(() => [
                  isRetriable.value ? (openBlock(), createBlock(_component_ElDropdownItem, {
                    key: 0,
                    "data-test-id": "execution-retry-saved-dropdown-item",
                    class: normalizeClass(_ctx.$style.retryAction),
                    command: "retrySaved",
                    disabled: !_ctx.workflowPermissions.execute
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(unref(i18n$1).baseText("executionsList.retryWithCurrentlySavedWorkflow")), 1)
                    ]),
                    _: 1
                  }, 8, ["class", "disabled"])) : createCommentVNode("", true),
                  isRetriable.value ? (openBlock(), createBlock(_component_ElDropdownItem, {
                    key: 1,
                    "data-test-id": "execution-retry-original-dropdown-item",
                    class: normalizeClass(_ctx.$style.retryAction),
                    command: "retryOriginal",
                    disabled: !_ctx.workflowPermissions.execute
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(unref(i18n$1).baseText("executionsList.retryWithOriginalWorkflow")), 1)
                    ]),
                    _: 1
                  }, 8, ["class", "disabled"])) : createCommentVNode("", true),
                  createVNode(_component_ElDropdownItem, {
                    "data-test-id": "execution-delete-dropdown-item",
                    class: normalizeClass(_ctx.$style.deleteAction),
                    command: "delete",
                    disabled: !_ctx.workflowPermissions.update
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(unref(i18n$1).baseText("generic.delete")), 1)
                    ]),
                    _: 1
                  }, 8, ["class", "disabled"])
                ]),
                _: 1
              }, 8, ["class"])
            ]),
            default: withCtx(() => [
              createVNode(_component_N8nIconButton, {
                text: "",
                type: "tertiary",
                size: "mini",
                icon: "ellipsis-v"
              })
            ]),
            _: 1
          })) : createCommentVNode("", true)
        ])
      ], 2);
    };
  }
});
const executionListItem = "_executionListItem_1rqmn_123";
const crashed = "_crashed_1rqmn_152";
const error = "_error_1rqmn_152";
const success = "_success_1rqmn_155";
const running = "_running_1rqmn_161";
const waiting = "_waiting_1rqmn_164";
const unknown = "_unknown_1rqmn_167";
const link = "_link_1rqmn_171";
const statusColumn = "_statusColumn_1rqmn_177";
const spinner = "_spinner_1rqmn_182";
const status = "_status_1rqmn_177";
const buttonCell = "_buttonCell_1rqmn_211";
const style0$1 = {
  executionListItem,
  crashed,
  error,
  success,
  "new": "_new_1rqmn_158",
  running,
  waiting,
  unknown,
  link,
  statusColumn,
  spinner,
  status,
  buttonCell
};
const cssModules$1 = {
  "$style": style0$1
};
const GlobalExecutionsListItem = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__cssModules", cssModules$1]]);
const _hoisted_1 = { key: 1 };
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "GlobalExecutionsList",
  props: {
    executions: {},
    filters: {},
    total: { default: 0 },
    estimated: { type: Boolean, default: false }
  },
  emits: ["update:filters", "execution:stop"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const i18n2 = useI18n();
    const telemetry = useTelemetry();
    const workflowsStore = useWorkflowsStore();
    const executionsStore = useExecutionsStore();
    const settingsStore = useSettingsStore();
    const pageRedirectionHelper = usePageRedirectionHelper();
    const isMounted = ref(false);
    const allVisibleSelected = ref(false);
    const allExistingSelected = ref(false);
    const selectedItems = ref({});
    const message = useMessage();
    const toast = useToast();
    const selectedCount = computed(() => {
      if (allExistingSelected.value) {
        return props.total;
      }
      return Object.keys(selectedItems.value).length;
    });
    const workflows = computed(() => {
      return [
        {
          id: "all",
          name: i18n2.baseText("executionsList.allWorkflows")
        },
        ...workflowsStore.allWorkflows
      ];
    });
    const isAnnotationEnabled = computed(
      () => settingsStore.isEnterpriseFeatureEnabled[EnterpriseEditionFeature.AdvancedExecutionFilters]
    );
    const runningExecutionsCount = computed(() => {
      return props.executions.filter(
        (execution) => execution.status === "running" && ["webhook", "trigger"].includes(execution.mode)
      ).length;
    });
    watch(
      () => props.executions,
      () => {
        if (props.executions.length === 0) {
          handleClearSelection();
        }
        adjustSelectionAfterMoreItemsLoaded();
      }
    );
    onMounted(() => {
      isMounted.value = true;
    });
    function handleCheckAllExistingChange() {
      allExistingSelected.value = !allExistingSelected.value;
      allVisibleSelected.value = !allExistingSelected.value;
      handleCheckAllVisibleChange();
    }
    function handleCheckAllVisibleChange() {
      allVisibleSelected.value = !allVisibleSelected.value;
      if (!allVisibleSelected.value) {
        allExistingSelected.value = false;
        selectedItems.value = {};
      } else {
        selectAllVisibleExecutions();
      }
    }
    function toggleSelectExecution(execution) {
      const executionId = execution.id;
      if (selectedItems.value[executionId]) {
        const { [executionId]: removedSelectedItem, ...rest } = selectedItems.value;
        selectedItems.value = rest;
      } else {
        selectedItems.value = {
          ...selectedItems.value,
          [executionId]: true
        };
      }
      allVisibleSelected.value = Object.keys(selectedItems.value).length === props.executions.length;
      allExistingSelected.value = Object.keys(selectedItems.value).length === props.total;
    }
    async function handleDeleteSelected() {
      const confirmationText = [
        isAnnotationEnabled.value && i18n2.baseText("executionsList.confirmMessage.annotationsNote"),
        i18n2.baseText("executionsList.confirmMessage.message", {
          interpolate: { count: selectedCount.value.toString() }
        })
      ].filter(Boolean).join(" ");
      const deleteExecutions = await message.confirm(
        confirmationText,
        i18n2.baseText("executionsList.confirmMessage.headline"),
        {
          type: "warning",
          confirmButtonText: i18n2.baseText("executionsList.confirmMessage.confirmButtonText"),
          cancelButtonText: i18n2.baseText("executionsList.confirmMessage.cancelButtonText")
        }
      );
      if (deleteExecutions !== MODAL_CONFIRM) {
        return;
      }
      try {
        await executionsStore.deleteExecutions({
          filters: executionsStore.executionsFilters,
          ...allExistingSelected.value ? { deleteBefore: /* @__PURE__ */ new Date() } : {
            ids: Object.keys(selectedItems.value)
          }
        });
      } catch (error2) {
        toast.showError(error2, i18n2.baseText("executionsList.showError.handleDeleteSelected.title"));
        return;
      }
      toast.showMessage({
        title: i18n2.baseText("executionsList.showMessage.handleDeleteSelected.title"),
        type: "success"
      });
      handleClearSelection();
    }
    function handleClearSelection() {
      allVisibleSelected.value = false;
      allExistingSelected.value = false;
      selectedItems.value = {};
    }
    async function onFilterChanged(filters) {
      emit("update:filters", filters);
      handleClearSelection();
    }
    function getExecutionWorkflowName(execution) {
      return getWorkflowName(execution.workflowId ?? "") ?? i18n2.baseText("executionsList.unsavedWorkflow");
    }
    function getExecutionWorkflowPermissions(execution) {
      return getResourcePermissions(execution.scopes).workflow;
    }
    function getWorkflowName(workflowId) {
      return workflows.value.find((data) => data.id === workflowId)?.name;
    }
    async function loadMore2() {
      if (executionsStore.filters.status === "running") {
        return;
      }
      let lastId;
      if (props.executions.length !== 0) {
        const lastItem = props.executions.slice(-1)[0];
        lastId = lastItem.id;
      }
      try {
        await executionsStore.fetchExecutions(executionsStore.executionsFilters, lastId);
      } catch (error2) {
        toast.showError(error2, i18n2.baseText("executionsList.showError.loadMore.title"));
      }
    }
    function selectAllVisibleExecutions() {
      props.executions.forEach((execution) => {
        selectedItems.value[execution.id] = true;
      });
    }
    function adjustSelectionAfterMoreItemsLoaded() {
      if (allExistingSelected.value) {
        allVisibleSelected.value = true;
        selectAllVisibleExecutions();
      }
    }
    async function retrySavedExecution(execution) {
      await retryExecution(execution, true);
    }
    async function retryOriginalExecution(execution) {
      await retryExecution(execution, false);
    }
    async function retryExecution(execution, loadWorkflow) {
      try {
        const retrySuccessful = await executionsStore.retryExecution(execution.id, loadWorkflow);
        if (retrySuccessful) {
          toast.showMessage({
            title: i18n2.baseText("executionsList.showMessage.retrySuccessfulTrue.title"),
            type: "success"
          });
        } else {
          toast.showMessage({
            title: i18n2.baseText("executionsList.showMessage.retrySuccessfulFalse.title"),
            type: "error"
          });
        }
      } catch (error2) {
        toast.showError(error2, i18n2.baseText("executionsList.showError.retryExecution.title"));
      }
      telemetry.track("User clicked retry execution button", {
        workflow_id: workflowsStore.workflowId,
        execution_id: execution.id,
        retry_type: loadWorkflow ? "current" : "original"
      });
    }
    async function stopExecution(execution) {
      try {
        await executionsStore.stopCurrentExecution(execution.id);
        toast.showMessage({
          title: i18n2.baseText("executionsList.showMessage.stopExecution.title"),
          message: i18n2.baseText("executionsList.showMessage.stopExecution.message", {
            interpolate: { activeExecutionId: execution.id }
          }),
          type: "success"
        });
        emit("execution:stop");
      } catch (error2) {
        toast.showError(error2, i18n2.baseText("executionsList.showError.stopExecution.title"));
      }
    }
    async function deleteExecution(execution) {
      const hasAnnotation = !!execution.annotation && (execution.annotation.vote || execution.annotation.tags.length > 0);
      if (hasAnnotation) {
        const deleteConfirmed = await message.confirm(
          i18n2.baseText("executionsList.confirmMessage.annotatedExecutionMessage"),
          i18n2.baseText("executionDetails.confirmMessage.headline"),
          {
            type: "warning",
            confirmButtonText: i18n2.baseText("executionDetails.confirmMessage.confirmButtonText"),
            cancelButtonText: ""
          }
        );
        if (deleteConfirmed !== MODAL_CONFIRM) {
          return;
        }
      }
      try {
        await executionsStore.deleteExecutions({ ids: [execution.id] });
        if (allVisibleSelected.value) {
          const { [execution.id]: _, ...rest } = selectedItems.value;
          selectedItems.value = rest;
        }
      } catch (error2) {
        toast.showError(error2, i18n2.baseText("executionsList.showError.handleDeleteSelected.title"));
      }
    }
    async function onAutoRefreshToggle(value) {
      if (value) {
        await executionsStore.startAutoRefreshInterval();
      } else {
        executionsStore.stopAutoRefreshInterval();
      }
    }
    const goToUpgrade = () => {
      void pageRedirectionHelper.goToUpgrade("concurrency", "upgrade-concurrency");
    };
    return (_ctx, _cache) => {
      const _component_N8nLoading = resolveComponent("N8nLoading");
      const _component_ElCheckbox = resolveComponent("ElCheckbox");
      const _component_el_checkbox = resolveComponent("el-checkbox");
      const _component_N8nButton = resolveComponent("N8nButton");
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(_ctx.$style.execListWrapper)
      }, [
        createVNode(ProjectHeader),
        createBaseVNode("div", {
          class: normalizeClass(_ctx.$style.execList)
        }, [
          createBaseVNode("div", {
            class: normalizeClass(_ctx.$style.execListHeader)
          }, [
            createBaseVNode("div", {
              class: normalizeClass(_ctx.$style.execListHeaderControls)
            }, [
              unref(settingsStore).isConcurrencyEnabled ? (openBlock(), createBlock(ConcurrentExecutionsHeader, {
                key: 0,
                class: "mr-xl",
                "running-executions-count": runningExecutionsCount.value,
                "concurrency-cap": unref(settingsStore).concurrency,
                "is-cloud-deployment": unref(settingsStore).isCloudDeployment,
                onGoToUpgrade: goToUpgrade
              }, null, 8, ["running-executions-count", "concurrency-cap", "is-cloud-deployment"])) : createCommentVNode("", true),
              !isMounted.value ? (openBlock(), createBlock(_component_N8nLoading, {
                key: 1,
                class: normalizeClass(_ctx.$style.filterLoader),
                variant: "custom"
              }, null, 8, ["class"])) : (openBlock(), createBlock(_component_ElCheckbox, {
                key: 2,
                modelValue: unref(executionsStore).autoRefresh,
                "onUpdate:modelValue": [
                  _cache[0] || (_cache[0] = ($event) => unref(executionsStore).autoRefresh = $event),
                  _cache[1] || (_cache[1] = ($event) => onAutoRefreshToggle($event))
                ],
                class: "mr-xl",
                "data-test-id": "execution-auto-refresh-checkbox"
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(unref(i18n2).baseText("executionsList.autoRefresh")), 1)
                ]),
                _: 1
              }, 8, ["modelValue"])),
              withDirectives(createVNode(ExecutionsFilter, {
                workflows: workflows.value,
                class: "execFilter",
                onFilterChanged
              }, null, 8, ["workflows"]), [
                [vShow, isMounted.value]
              ])
            ], 2)
          ], 2),
          allVisibleSelected.value && _ctx.total > 0 ? (openBlock(), createBlock(_component_ElCheckbox, {
            key: 0,
            class: normalizeClass(_ctx.$style.selectAll),
            label: unref(i18n2).baseText("executionsList.selectAll", {
              adjustToNumber: _ctx.total,
              interpolate: { executionNum: `${_ctx.total}` }
            }),
            "model-value": allExistingSelected.value,
            "data-test-id": "select-all-executions-checkbox",
            "onUpdate:modelValue": handleCheckAllExistingChange
          }, null, 8, ["class", "label", "model-value"])) : createCommentVNode("", true),
          !isMounted.value ? (openBlock(), createElementBlock("div", _hoisted_1, [
            createVNode(_component_N8nLoading, {
              class: normalizeClass(_ctx.$style.tableLoader),
              variant: "custom"
            }, null, 8, ["class"]),
            createVNode(_component_N8nLoading, {
              class: normalizeClass(_ctx.$style.tableLoader),
              variant: "custom"
            }, null, 8, ["class"]),
            createVNode(_component_N8nLoading, {
              class: normalizeClass(_ctx.$style.tableLoader),
              variant: "custom"
            }, null, 8, ["class"])
          ])) : (openBlock(), createElementBlock("table", {
            key: 2,
            class: normalizeClass(_ctx.$style.execTable)
          }, [
            createBaseVNode("thead", null, [
              createBaseVNode("tr", null, [
                createBaseVNode("th", null, [
                  createVNode(_component_el_checkbox, {
                    "model-value": allVisibleSelected.value,
                    disabled: _ctx.total < 1,
                    label: "",
                    "data-test-id": "select-visible-executions-checkbox",
                    "onUpdate:modelValue": handleCheckAllVisibleChange
                  }, null, 8, ["model-value", "disabled"])
                ]),
                createBaseVNode("th", null, toDisplayString(unref(i18n2).baseText("executionsList.name")), 1),
                createBaseVNode("th", null, toDisplayString(unref(i18n2).baseText("executionsList.startedAt")), 1),
                createBaseVNode("th", null, toDisplayString(unref(i18n2).baseText("executionsList.status")), 1),
                createBaseVNode("th", null, toDisplayString(unref(i18n2).baseText("executionsList.id")), 1),
                _cache[3] || (_cache[3] = createBaseVNode("th", null, null, -1)),
                _cache[4] || (_cache[4] = createBaseVNode("th", null, null, -1)),
                _cache[5] || (_cache[5] = createBaseVNode("th", null, null, -1)),
                _cache[6] || (_cache[6] = createBaseVNode("th", null, null, -1))
              ])
            ]),
            createVNode(TransitionGroup, {
              tag: "tbody",
              name: "executions-list"
            }, {
              default: withCtx(() => [
                (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.executions, (execution) => {
                  return openBlock(), createBlock(GlobalExecutionsListItem, {
                    key: execution.id,
                    execution,
                    "workflow-name": getExecutionWorkflowName(execution),
                    "workflow-permissions": getExecutionWorkflowPermissions(execution),
                    selected: selectedItems.value[execution.id] || allExistingSelected.value,
                    "concurrency-cap": unref(settingsStore).concurrency,
                    "is-cloud-deployment": unref(settingsStore).isCloudDeployment,
                    "data-test-id": "global-execution-list-item",
                    onStop: stopExecution,
                    onDelete: deleteExecution,
                    onSelect: toggleSelectExecution,
                    onRetrySaved: retrySavedExecution,
                    onRetryOriginal: retryOriginalExecution,
                    onGoToUpgrade: goToUpgrade
                  }, null, 8, ["execution", "workflow-name", "workflow-permissions", "selected", "concurrency-cap", "is-cloud-deployment"]);
                }), 128))
              ]),
              _: 1
            })
          ], 2)),
          !_ctx.executions.length && isMounted.value && !unref(executionsStore).loading ? (openBlock(), createElementBlock("div", {
            key: 3,
            class: normalizeClass(_ctx.$style.loadedAll),
            "data-test-id": "execution-list-empty"
          }, toDisplayString(unref(i18n2).baseText("executionsList.empty")), 3)) : _ctx.total > _ctx.executions.length || _ctx.estimated ? (openBlock(), createElementBlock("div", {
            key: 4,
            class: normalizeClass(_ctx.$style.loadMore)
          }, [
            createVNode(_component_N8nButton, {
              icon: "sync",
              title: unref(i18n2).baseText("executionsList.loadMore"),
              label: unref(i18n2).baseText("executionsList.loadMore"),
              loading: unref(executionsStore).loading,
              "data-test-id": "load-more-button",
              onClick: _cache[2] || (_cache[2] = ($event) => loadMore2())
            }, null, 8, ["title", "label", "loading"])
          ], 2)) : isMounted.value && !unref(executionsStore).loading ? (openBlock(), createElementBlock("div", {
            key: 5,
            class: normalizeClass(_ctx.$style.loadedAll),
            "data-test-id": "execution-all-loaded"
          }, toDisplayString(unref(i18n2).baseText("executionsList.loadedAll")), 3)) : createCommentVNode("", true)
        ], 2),
        selectedCount.value > 0 ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(_ctx.$style.selectionOptions),
          "data-test-id": "selected-executions-info"
        }, [
          createBaseVNode("span", null, toDisplayString(unref(i18n2).baseText("executionsList.selected", {
            adjustToNumber: selectedCount.value,
            interpolate: { count: `${selectedCount.value}` }
          })), 1),
          createVNode(_component_N8nButton, {
            label: unref(i18n2).baseText("generic.delete"),
            type: "tertiary",
            "data-test-id": "delete-selected-button",
            onClick: handleDeleteSelected
          }, null, 8, ["label"]),
          createVNode(_component_N8nButton, {
            label: unref(i18n2).baseText("executionsList.clearSelection"),
            type: "tertiary",
            "data-test-id": "clear-selection-button",
            onClick: handleClearSelection
          }, null, 8, ["label"])
        ], 2)) : createCommentVNode("", true)
      ], 2);
    };
  }
});
const execListWrapper = "_execListWrapper_152sq_123";
const execList = "_execList_152sq_123";
const execListHeader = "_execListHeader_152sq_144";
const execListHeaderControls = "_execListHeaderControls_152sq_151";
const selectionOptions = "_selectionOptions_152sq_157";
const execTable = "_execTable_152sq_175";
const loadMore = "_loadMore_152sq_218";
const loadedAll = "_loadedAll_152sq_224";
const actions = "_actions_152sq_231";
const deleteOnly = "_deleteOnly_152sq_231";
const retryAction = "_retryAction_152sq_235";
const deleteAction = "_deleteAction_152sq_235";
const selectAll = "_selectAll_152sq_239";
const filterLoader = "_filterLoader_152sq_245";
const tableLoader = "_tableLoader_152sq_250";
const style0 = {
  execListWrapper,
  execList,
  execListHeader,
  execListHeaderControls,
  selectionOptions,
  execTable,
  loadMore,
  loadedAll,
  actions,
  deleteOnly,
  retryAction,
  deleteAction,
  selectAll,
  filterLoader,
  tableLoader
};
const cssModules = {
  "$style": style0
};
const GlobalExecutionsList = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__cssModules", cssModules], ["__scopeId", "data-v-cb068364"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ExecutionsView",
  setup(__props) {
    const route = useRoute();
    const i18n2 = useI18n();
    const telemetry = useTelemetry();
    const externalHooks = useExternalHooks();
    const workflowsStore = useWorkflowsStore();
    const executionsStore = useExecutionsStore();
    const documentTitle = useDocumentTitle();
    const toast = useToast();
    const { executionsCount, executionsCountEstimated, filters, allExecutions } = storeToRefs(executionsStore);
    onBeforeMount(async () => {
      await loadWorkflows();
      void externalHooks.run("executionsList.openDialog");
      telemetry.track("User opened Executions log", {
        workflow_id: workflowsStore.workflowId
      });
    });
    onMounted(async () => {
      documentTitle.set(i18n2.baseText("executionsList.workflowExecutions"));
      document.addEventListener("visibilitychange", onDocumentVisibilityChange);
      await executionsStore.initialize();
    });
    onBeforeUnmount(() => {
      executionsStore.reset();
      document.removeEventListener("visibilitychange", onDocumentVisibilityChange);
    });
    async function loadWorkflows() {
      try {
        await workflowsStore.fetchAllWorkflows(route.params?.projectId);
      } catch (error2) {
        toast.showError(error2, i18n2.baseText("executionsList.showError.loadWorkflows.title"));
      }
    }
    function onDocumentVisibilityChange() {
      if (document.visibilityState === "hidden") {
        executionsStore.stopAutoRefreshInterval();
      } else {
        void executionsStore.startAutoRefreshInterval();
      }
    }
    async function onRefreshData() {
      try {
        await executionsStore.fetchExecutions();
      } catch (error2) {
        toast.showError(error2, i18n2.baseText("executionsList.showError.refreshData.title"));
      }
    }
    async function onUpdateFilters(newFilters) {
      executionsStore.reset();
      executionsStore.setFilters(newFilters);
      await executionsStore.initialize();
    }
    async function onExecutionStop() {
      await onRefreshData();
    }
    return (_ctx, _cache) => {
      return openBlock(), createBlock(GlobalExecutionsList, {
        executions: unref(allExecutions),
        filters: unref(filters),
        total: unref(executionsCount),
        "estimated-total": unref(executionsCountEstimated),
        "onExecution:stop": onExecutionStop,
        "onUpdate:filters": onUpdateFilters
      }, null, 8, ["executions", "filters", "total", "estimated-total"]);
    };
  }
});
export {
  _sfc_main as default
};
