import { d as defineComponent, b as useRouter, a5 as useWorkflowHelpers, p as useSettingsStore, L as useUIStore, U as useWorkflowsStore, a3 as useNpsSurveyStore, r as ref, q as computed, I as watch, o as onMounted, c as openBlock, e as createBlock, w as withCtx, j as createBaseVNode, k as createTextVNode, t as toDisplayString, l as unref, i as createVNode, J as withModifiers, n as normalizeClass, g as useI18n, ag as WORKFLOW_SETTINGS_MODAL_KEY, m as resolveComponent, bV as deepCopy, Y as PLACEHOLDER_EMPTY_WORKFLOW_ID, _ as _export_sfc } from "./index-DkwrpQEB.js";
const _hoisted_1 = { class: "mt-2xs" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "WorkflowExecutionsInfoAccordion",
  props: {
    initiallyExpanded: { type: Boolean, default: false }
  },
  setup(__props) {
    const props = __props;
    const i18n = useI18n();
    const router = useRouter();
    const workflowHelpers = useWorkflowHelpers({ router });
    const locale = useI18n();
    const settingsStore = useSettingsStore();
    const uiStore = useUIStore();
    const workflowsStore = useWorkflowsStore();
    const npsSurveyStore = useNpsSurveyStore();
    const defaultValues = ref({
      saveFailedExecutions: "all",
      saveSuccessfulExecutions: "all",
      saveManualExecutions: false
    });
    const workflowSaveSettings = ref({
      saveFailedExecutions: false,
      saveSuccessfulExecutions: false,
      saveTestExecutions: false
    });
    const accordionItems = computed(() => [
      {
        id: "productionExecutions",
        label: locale.baseText("executionsLandingPage.emptyState.accordion.productionExecutions"),
        icon: productionExecutionsIcon.value.icon,
        iconColor: productionExecutionsIcon.value.color,
        tooltip: productionExecutionsStatus.value === "unknown" ? locale.baseText(
          "executionsLandingPage.emptyState.accordion.productionExecutionsWarningTooltip"
        ) : null
      },
      {
        id: "manualExecutions",
        label: locale.baseText("executionsLandingPage.emptyState.accordion.testExecutions"),
        icon: workflowSaveSettings.value.saveTestExecutions ? "check" : "times",
        iconColor: workflowSaveSettings.value.saveTestExecutions ? "success" : "danger"
      }
    ]);
    const shouldExpandAccordion = computed(() => {
      if (!props.initiallyExpanded) {
        return false;
      }
      return !workflowSaveSettings.value.saveFailedExecutions || !workflowSaveSettings.value.saveSuccessfulExecutions || !workflowSaveSettings.value.saveTestExecutions;
    });
    const productionExecutionsIcon = computed(() => {
      if (productionExecutionsStatus.value === "saving") {
        return { icon: "check", color: "success" };
      } else if (productionExecutionsStatus.value === "not-saving") {
        return { icon: "times", color: "danger" };
      }
      return { icon: "exclamation-triangle", color: "warning" };
    });
    const productionExecutionsStatus = computed(() => {
      if (workflowSaveSettings.value.saveSuccessfulExecutions === workflowSaveSettings.value.saveFailedExecutions) {
        if (workflowSaveSettings.value.saveSuccessfulExecutions) {
          return "saving";
        }
        return "not-saving";
      } else {
        return "unknown";
      }
    });
    const workflowSettings = computed(() => deepCopy(workflowsStore.workflowSettings));
    const accordionIcon = computed(() => {
      if (!workflowSaveSettings.value.saveTestExecutions || productionExecutionsStatus.value !== "saving") {
        return { icon: "exclamation-triangle", color: "warning" };
      }
      return null;
    });
    const currentWorkflowId = computed(() => workflowsStore.workflowId);
    const isNewWorkflow = computed(() => {
      return !currentWorkflowId.value || currentWorkflowId.value === PLACEHOLDER_EMPTY_WORKFLOW_ID || currentWorkflowId.value === "new";
    });
    const workflowName = computed(() => workflowsStore.workflowName);
    const currentWorkflowTagIds = computed(() => workflowsStore.workflowTags);
    watch(workflowSettings, (newSettings) => {
      updateSettings(newSettings);
    });
    onMounted(() => {
      defaultValues.value.saveFailedExecutions = settingsStore.saveDataErrorExecution;
      defaultValues.value.saveSuccessfulExecutions = settingsStore.saveDataSuccessExecution;
      defaultValues.value.saveManualExecutions = settingsStore.saveManualExecutions;
      updateSettings(workflowSettings.value);
    });
    function updateSettings(wfSettings) {
      workflowSaveSettings.value.saveFailedExecutions = wfSettings.saveDataErrorExecution === void 0 ? defaultValues.value.saveFailedExecutions === "all" : wfSettings.saveDataErrorExecution === "all";
      workflowSaveSettings.value.saveSuccessfulExecutions = wfSettings.saveDataSuccessExecution === void 0 ? defaultValues.value.saveSuccessfulExecutions === "all" : wfSettings.saveDataSuccessExecution === "all";
      workflowSaveSettings.value.saveTestExecutions = wfSettings.saveManualExecutions === void 0 ? defaultValues.value.saveManualExecutions : wfSettings.saveManualExecutions;
    }
    function onAccordionClick(event) {
      if (event.target instanceof HTMLAnchorElement) {
        event.preventDefault();
        uiStore.openModal(WORKFLOW_SETTINGS_MODAL_KEY);
      }
    }
    function onItemTooltipClick(item, event) {
      if (item === "productionExecutions" && event.target instanceof HTMLAnchorElement) {
        event.preventDefault();
        uiStore.openModal(WORKFLOW_SETTINGS_MODAL_KEY);
      }
    }
    function openWorkflowSettings() {
      uiStore.openModal(WORKFLOW_SETTINGS_MODAL_KEY);
    }
    async function onSaveWorkflowClick() {
      let currentId = void 0;
      if (currentWorkflowId.value !== PLACEHOLDER_EMPTY_WORKFLOW_ID) {
        currentId = currentWorkflowId.value;
      } else if (router.currentRoute.value.params.name && router.currentRoute.value.params.name !== "new") {
        const routeName = router.currentRoute.value.params.name;
        currentId = Array.isArray(routeName) ? routeName[0] : routeName;
      }
      if (!currentId) {
        return;
      }
      const saved = await workflowHelpers.saveCurrentWorkflow({
        id: currentId,
        name: workflowName.value,
        tags: currentWorkflowTagIds.value
      });
      if (saved) {
        await npsSurveyStore.fetchPromptsData();
      }
    }
    return (_ctx, _cache) => {
      const _component_N8nLink = resolveComponent("N8nLink");
      const _component_N8nTooltip = resolveComponent("N8nTooltip");
      const _component_N8nInfoAccordion = resolveComponent("N8nInfoAccordion");
      return openBlock(), createBlock(_component_N8nInfoAccordion, {
        class: normalizeClass([_ctx.$style.accordion, "mt-2xl"]),
        title: unref(i18n).baseText("executionsLandingPage.emptyState.accordion.title"),
        items: accordionItems.value,
        "initially-expanded": shouldExpandAccordion.value,
        "header-icon": accordionIcon.value,
        "onClick:body": onAccordionClick,
        onTooltipClick: onItemTooltipClick
      }, {
        customContent: withCtx(() => [
          createBaseVNode("footer", _hoisted_1, [
            createTextVNode(toDisplayString(unref(i18n).baseText("executionsLandingPage.emptyState.accordion.footer")) + " ", 1),
            createVNode(_component_N8nTooltip, {
              disabled: !isNewWorkflow.value
            }, {
              content: withCtx(() => [
                createBaseVNode("div", null, [
                  createVNode(_component_N8nLink, {
                    onClick: withModifiers(onSaveWorkflowClick, ["prevent"])
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(unref(i18n).baseText("executionsLandingPage.emptyState.accordion.footer.tooltipLink")), 1)
                    ]),
                    _: 1
                  }),
                  createTextVNode(" " + toDisplayString(unref(i18n).baseText("executionsLandingPage.emptyState.accordion.footer.tooltipText")), 1)
                ])
              ]),
              default: withCtx(() => [
                createVNode(_component_N8nLink, {
                  class: normalizeClass({ [_ctx.$style.disabled]: isNewWorkflow.value }),
                  size: "small",
                  onClick: withModifiers(openWorkflowSettings, ["prevent"])
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(unref(i18n).baseText("executionsLandingPage.emptyState.accordion.footer.settingsLink")), 1)
                  ]),
                  _: 1
                }, 8, ["class"])
              ]),
              _: 1
            }, 8, ["disabled"])
          ])
        ]),
        _: 1
      }, 8, ["class", "title", "items", "initially-expanded", "header-icon"]);
    };
  }
});
const accordion = "_accordion_1f6co_123";
const disabled = "_disabled_1f6co_149";
const style0 = {
  accordion,
  disabled
};
const cssModules = {
  "$style": style0
};
const WorkflowExecutionsInfoAccordion = /* @__PURE__ */ _export_sfc(_sfc_main, [["__cssModules", cssModules]]);
export {
  WorkflowExecutionsInfoAccordion as W
};
