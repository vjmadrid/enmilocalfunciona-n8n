import { d as defineComponent, W as useRoute, b as useRouter, q as computed, g9 as ProjectTypes, V as VIEWS, m as resolveComponent, c as openBlock, h as createElementBlock, i as createVNode, w as withCtx, n as normalizeClass, k as createTextVNode, t as toDisplayString, j as createBaseVNode, l as unref, J as withModifiers, aT as createSlots, e as createBlock, f as createCommentVNode, g as useI18n, cB as _sfc_main$4, ga as __unplugin_components_0$1, _ as _export_sfc, a2 as useProjectsStore, a as useToast, p as useSettingsStore, L as useUIStore, u as useUsersStore, U as useWorkflowsStore, am as getResourcePermissions, dS as dateFormat, gb as ResourceType, ax as withDirectives, ay as vShow, ac as WORKFLOW_SHARE_MODAL_KEY, aj as DUPLICATE_MODAL_KEY, af as MODAL_CONFIRM, gc as PROJECT_MOVE_RESOURCE_MODAL, al as useMessage, ak as useTelemetry, S as defineStore, T as STORES, $ as useRootStore, r as ref, gd as createFolder, ge as getFolderPath, gf as getWorkflowsAndFolders, a1 as useSourceControlStore, au as usePostHog, E as useTagsStore, a4 as useDocumentTitle, K as useDebounce, gg as DEFAULT_WORKFLOW_PAGE_SIZE, a9 as EnterpriseEditionFeature, gh as EASY_AI_WORKFLOW_EXPERIMENT, I as watch, o as onMounted, y as onBeforeUnmount, A as debounce, fZ as N8nIcon, cG as N8nHeading, fY as N8nText, gi as N8nCard, cV as N8nInputLabel, a8 as _sfc_main$5, gj as N8nSelect, F as Fragment, B as renderList, gk as _sfc_main$6, D as createEventBus, bI as AI_CREDITS_EXPERIMENT } from "./index-DkwrpQEB.js";
import { R as ResourcesListLayout } from "./ResourcesListLayout--Bt5VWxW.js";
import { W as WorkflowActivator } from "./WorkflowActivator-Dio1FWuT.js";
import { P as ProjectCardBadge } from "./ProjectCardBadge-CukEqaMt.js";
import { P as ProjectHeader } from "./ProjectHeader-DyqSSbiB.js";
import { g as getEasyAiWorkflowJson } from "./easyAiWorkflowUtils-qtdB9CeQ.js";
import "./useWorkflowActivate-COcGS4jx.js";
import "./ProjectCreateResource-CtheSWks.js";
const FOLDER_LIST_ITEM_ACTIONS = {
  OPEN: "open",
  CREATE: "create",
  CREATE_WORKFLOW: "create_workflow",
  RENAME: "rename",
  MOVE: "move",
  CHOWN: "change_owner",
  TAGS: "manage_tags",
  DELETE: "delete"
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "FolderCard",
  props: {
    data: {},
    actions: { default: () => [] },
    breadcrumbs: {}
  },
  emits: ["action", "folderOpened"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const i18n = useI18n();
    const route = useRoute();
    const router = useRouter();
    const emit = __emit;
    const projectIcon = computed(() => {
      const defaultIcon = { type: "icon", value: "layer-group" };
      if (props.data.homeProject?.type === ProjectTypes.Personal) {
        return { type: "icon", value: "user" };
      } else if (props.data.homeProject?.type === ProjectTypes.Team) {
        return props.data.homeProject.icon ?? defaultIcon;
      }
      return defaultIcon;
    });
    const projectName = computed(() => {
      if (props.data.homeProject?.type === ProjectTypes.Personal) {
        return i18n.baseText("projects.menu.personal");
      }
      return props.data.homeProject?.name;
    });
    const cardUrl = computed(() => {
      return getFolderUrl(props.data.id);
    });
    const getFolderUrl = (folderId) => {
      return router.resolve({
        name: VIEWS.PROJECTS_FOLDERS,
        params: {
          projectId: route.params.projectId,
          folderId
        },
        query: route.query
      }).href;
    };
    const onAction = async (action) => {
      if (action === FOLDER_LIST_ITEM_ACTIONS.OPEN) {
        emit("folderOpened", { folder: props.data });
        await router.push(cardUrl.value);
        return;
      }
      emit("action", { action, folderId: props.data.id });
    };
    const onBreadcrumbsItemClick = async (item) => {
      if (item.href) {
        await router.push(item.href);
      }
    };
    return (_ctx, _cache) => {
      const _component_n8n_icon = resolveComponent("n8n-icon");
      const _component_n8n_heading = resolveComponent("n8n-heading");
      const _component_n8n_text = resolveComponent("n8n-text");
      const _component_TimeAgo = _sfc_main$4;
      const _component_ProjectIcon = __unplugin_components_0$1;
      const _component_n8n_link = resolveComponent("n8n-link");
      const _component_n8n_breadcrumbs = resolveComponent("n8n-breadcrumbs");
      const _component_n8n_action_toggle = resolveComponent("n8n-action-toggle");
      const _component_n8n_card = resolveComponent("n8n-card");
      const _component_router_link = resolveComponent("router-link");
      return openBlock(), createElementBlock("div", null, [
        createVNode(_component_router_link, {
          to: cardUrl.value,
          onClick: _cache[1] || (_cache[1] = () => emit("folderOpened", { folder: props.data }))
        }, {
          default: withCtx(() => [
            createVNode(_component_n8n_card, {
              class: normalizeClass(_ctx.$style.card)
            }, {
              prepend: withCtx(() => [
                createVNode(_component_n8n_icon, {
                  "data-test-id": "folder-card-icon",
                  class: normalizeClass(_ctx.$style["folder-icon"]),
                  icon: "folder",
                  size: "large"
                }, null, 8, ["class"])
              ]),
              header: withCtx(() => [
                createVNode(_component_n8n_heading, {
                  tag: "h2",
                  bold: "",
                  size: "small",
                  "data-test-id": "folder-card-name"
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(_ctx.data.name), 1)
                  ]),
                  _: 1
                })
              ]),
              footer: withCtx(() => [
                createBaseVNode("div", {
                  class: normalizeClass(_ctx.$style["card-footer"])
                }, [
                  createVNode(_component_n8n_text, {
                    size: "small",
                    color: "text-light",
                    class: normalizeClass([_ctx.$style["info-cell"], _ctx.$style["info-cell--workflow-count"]]),
                    "data-test-id": "folder-card-workflow-count"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(_ctx.data.workflowCount) + " " + toDisplayString(unref(i18n).baseText("generic.workflows")), 1)
                    ]),
                    _: 1
                  }, 8, ["class"]),
                  createVNode(_component_n8n_text, {
                    size: "small",
                    color: "text-light",
                    class: normalizeClass([_ctx.$style["info-cell"], _ctx.$style["info-cell--updated"]]),
                    "data-test-id": "folder-card-last-updated"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(unref(i18n).baseText("workerList.item.lastUpdated")) + " ", 1),
                      createVNode(_component_TimeAgo, {
                        date: String(_ctx.data.updatedAt)
                      }, null, 8, ["date"])
                    ]),
                    _: 1
                  }, 8, ["class"]),
                  createVNode(_component_n8n_text, {
                    size: "small",
                    color: "text-light",
                    class: normalizeClass([_ctx.$style["info-cell"], _ctx.$style["info-cell--created"]]),
                    "data-test-id": "folder-card-created"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(unref(i18n).baseText("workflows.item.created")) + " ", 1),
                      createVNode(_component_TimeAgo, {
                        date: String(_ctx.data.createdAt)
                      }, null, 8, ["date"])
                    ]),
                    _: 1
                  }, 8, ["class"])
                ], 2)
              ]),
              append: withCtx(() => [
                createBaseVNode("div", {
                  class: normalizeClass(_ctx.$style["card-actions"]),
                  onClick: _cache[0] || (_cache[0] = withModifiers(() => {
                  }, ["prevent"]))
                }, [
                  createBaseVNode("div", {
                    class: normalizeClass(_ctx.$style.breadcrumbs)
                  }, [
                    createVNode(_component_n8n_breadcrumbs, {
                      items: _ctx.breadcrumbs.visibleItems,
                      "hidden-items": _ctx.breadcrumbs.hiddenItems,
                      "path-truncated": _ctx.breadcrumbs.visibleItems[0]?.parentFolder,
                      "show-border": true,
                      "highlight-last-item": false,
                      theme: "small",
                      "data-test-id": "folder-card-breadcrumbs",
                      onItemSelected: onBreadcrumbsItemClick
                    }, createSlots({ _: 2 }, [
                      _ctx.data.homeProject ? {
                        name: "prepend",
                        fn: withCtx(() => [
                          createBaseVNode("div", {
                            class: normalizeClass(_ctx.$style["home-project"])
                          }, [
                            createVNode(_component_n8n_link, {
                              to: `/projects/${_ctx.data.homeProject.id}`
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_ProjectIcon, {
                                  icon: projectIcon.value,
                                  "border-less": true,
                                  size: "mini"
                                }, null, 8, ["icon"]),
                                createVNode(_component_n8n_text, {
                                  size: "small",
                                  compact: true,
                                  bold: true,
                                  color: "text-base"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(projectName.value), 1)
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }, 8, ["to"])
                          ], 2)
                        ]),
                        key: "0"
                      } : void 0
                    ]), 1032, ["items", "hidden-items", "path-truncated"])
                  ], 2),
                  _ctx.actions.length ? (openBlock(), createBlock(_component_n8n_action_toggle, {
                    key: 0,
                    actions: _ctx.actions,
                    theme: "dark",
                    "data-test-id": "folder-card-actions",
                    onAction
                  }, null, 8, ["actions"])) : createCommentVNode("", true)
                ], 2)
              ]),
              _: 1
            }, 8, ["class"])
          ]),
          _: 1
        }, 8, ["to"])
      ]);
    };
  }
});
const card = "_card_v01dx_123";
const style0$3 = {
  card,
  "folder-icon": "_folder-icon_v01dx_131",
  "card-footer": "_card-footer_v01dx_142",
  "info-cell": "_info-cell_v01dx_146",
  "card-actions": "_card-actions_v01dx_151",
  "home-project": "_home-project_v01dx_156",
  "info-cell--created": "_info-cell--created_v01dx_176"
};
const cssModules$3 = {
  "$style": style0$3
};
const __unplugin_components_1 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__cssModules", cssModules$3]]);
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "FolderBreadcrumbs",
  props: {
    actions: {},
    breadcrumbs: {}
  },
  emits: ["itemSelected", "action"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const i18n = useI18n();
    const projectsStore = useProjectsStore();
    const currentProject = computed(() => projectsStore.currentProject);
    const projectName = computed(() => {
      if (currentProject.value?.type === ProjectTypes.Personal) {
        return i18n.baseText("projects.menu.personal");
      }
      return currentProject.value?.name;
    });
    const onItemSelect = (item) => {
      emit("itemSelected", item);
    };
    const onAction = (action) => {
      emit("action", action);
    };
    return (_ctx, _cache) => {
      const _component_N8nText = resolveComponent("N8nText");
      const _component_n8n_link = resolveComponent("n8n-link");
      const _component_n8n_breadcrumbs = resolveComponent("n8n-breadcrumbs");
      const _component_n8n_action_toggle = resolveComponent("n8n-action-toggle");
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(_ctx.$style.container)
      }, [
        _ctx.breadcrumbs.visibleItems ? (openBlock(), createBlock(_component_n8n_breadcrumbs, {
          key: 0,
          items: _ctx.breadcrumbs.visibleItems,
          "highlight-last-item": false,
          "path-truncated": _ctx.breadcrumbs.visibleItems[0].parentFolder,
          "hidden-items": _ctx.breadcrumbs.hiddenItems,
          "data-test-id": "folder-card-breadcrumbs",
          onItemSelected: onItemSelect
        }, createSlots({ _: 2 }, [
          currentProject.value ? {
            name: "prepend",
            fn: withCtx(() => [
              createBaseVNode("div", {
                class: normalizeClass(_ctx.$style["home-project"])
              }, [
                createVNode(_component_n8n_link, {
                  to: `/projects/${currentProject.value.id}`
                }, {
                  default: withCtx(() => [
                    createVNode(_component_N8nText, {
                      size: "large",
                      color: "text-base"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(projectName.value), 1)
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["to"])
              ], 2)
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["items", "path-truncated", "hidden-items"])) : createCommentVNode("", true),
        _ctx.breadcrumbs.visibleItems ? (openBlock(), createBlock(_component_n8n_action_toggle, {
          key: 1,
          actions: _ctx.actions,
          theme: "dark",
          "data-test-id": "folder-breadcrumbs-actions",
          onAction
        }, null, 8, ["actions"])) : createCommentVNode("", true)
      ], 2);
    };
  }
});
const container = "_container_1e41k_123";
const style0$2 = {
  container,
  "home-project": "_home-project_1e41k_128"
};
const cssModules$2 = {
  "$style": style0$2
};
const __unplugin_components_0 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__cssModules", cssModules$2]]);
const _hoisted_1$1 = { key: 0 };
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "WorkflowCard",
  props: {
    data: {},
    breadcrumbs: {},
    readOnly: { type: Boolean, default: false },
    workflowListEventBus: { default: void 0 }
  },
  emits: ["expand:tags", "click:tag", "workflow:deleted", "workflow:active-toggle"],
  setup(__props, { emit: __emit }) {
    const WORKFLOW_LIST_ITEM_ACTIONS = {
      OPEN: "open",
      SHARE: "share",
      DUPLICATE: "duplicate",
      DELETE: "delete",
      MOVE: "move"
    };
    const props = __props;
    const emit = __emit;
    const toast = useToast();
    const message = useMessage();
    const locale = useI18n();
    const router = useRouter();
    const telemetry = useTelemetry();
    const i18n = useI18n();
    const settingsStore = useSettingsStore();
    const uiStore = useUIStore();
    const usersStore = useUsersStore();
    const workflowsStore = useWorkflowsStore();
    const projectsStore = useProjectsStore();
    const resourceTypeLabel = computed(() => locale.baseText("generic.workflow").toLowerCase());
    const currentUser = computed(() => usersStore.currentUser ?? {});
    const workflowPermissions = computed(() => getResourcePermissions(props.data.scopes).workflow);
    const actions = computed(() => {
      const items = [
        {
          label: locale.baseText("workflows.item.open"),
          value: WORKFLOW_LIST_ITEM_ACTIONS.OPEN
        },
        {
          label: locale.baseText("workflows.item.share"),
          value: WORKFLOW_LIST_ITEM_ACTIONS.SHARE
        }
      ];
      if (workflowPermissions.value.create && !props.readOnly) {
        items.push({
          label: locale.baseText("workflows.item.duplicate"),
          value: WORKFLOW_LIST_ITEM_ACTIONS.DUPLICATE
        });
      }
      if (workflowPermissions.value.move && projectsStore.isTeamProjectFeatureEnabled) {
        items.push({
          label: locale.baseText("workflows.item.move"),
          value: WORKFLOW_LIST_ITEM_ACTIONS.MOVE
        });
      }
      if (workflowPermissions.value.delete && !props.readOnly) {
        items.push({
          label: locale.baseText("workflows.item.delete"),
          value: WORKFLOW_LIST_ITEM_ACTIONS.DELETE
        });
      }
      return items;
    });
    const formattedCreatedAtDate = computed(() => {
      const currentYear = (/* @__PURE__ */ new Date()).getFullYear().toString();
      return dateFormat(
        props.data.createdAt,
        `d mmmm${String(props.data.createdAt).startsWith(currentYear) ? "" : ", yyyy"}`
      );
    });
    const projectIcon = computed(() => {
      const defaultIcon = { type: "icon", value: "layer-group" };
      if (props.data.homeProject?.type === ProjectTypes.Personal) {
        return { type: "icon", value: "user" };
      } else if (props.data.homeProject?.type === ProjectTypes.Team) {
        return props.data.homeProject.icon ?? defaultIcon;
      }
      return defaultIcon;
    });
    const projectName = computed(() => {
      if (props.data.homeProject?.type === ProjectTypes.Personal) {
        return i18n.baseText("projects.menu.personal");
      }
      return props.data.homeProject?.name;
    });
    async function onClick(event) {
      if (event?.ctrlKey || event?.metaKey) {
        const route = router.resolve({
          name: VIEWS.WORKFLOW,
          params: { name: props.data.id }
        });
        window.open(route.href, "_blank");
        return;
      }
      await router.push({
        name: VIEWS.WORKFLOW,
        params: { name: props.data.id }
      });
    }
    function onClickTag(tagId, event) {
      event.stopPropagation();
      emit("click:tag", tagId, event);
    }
    function onExpandTags() {
      emit("expand:tags");
    }
    async function onAction(action) {
      switch (action) {
        case WORKFLOW_LIST_ITEM_ACTIONS.OPEN:
          await onClick();
          break;
        case WORKFLOW_LIST_ITEM_ACTIONS.DUPLICATE:
          uiStore.openModalWithData({
            name: DUPLICATE_MODAL_KEY,
            data: {
              id: props.data.id,
              name: props.data.name,
              tags: (props.data.tags ?? []).map(
                (tag) => typeof tag !== "string" && "id" in tag ? tag.id : tag
              ),
              externalEventBus: props.workflowListEventBus
            }
          });
          break;
        case WORKFLOW_LIST_ITEM_ACTIONS.SHARE:
          uiStore.openModalWithData({
            name: WORKFLOW_SHARE_MODAL_KEY,
            data: { id: props.data.id }
          });
          telemetry.track("User opened sharing modal", {
            workflow_id: props.data.id,
            user_id_sharer: currentUser.value.id,
            sub_view: "Workflows listing"
          });
          break;
        case WORKFLOW_LIST_ITEM_ACTIONS.DELETE:
          await deleteWorkflow();
          break;
        case WORKFLOW_LIST_ITEM_ACTIONS.MOVE:
          moveResource();
          break;
      }
    }
    async function deleteWorkflow() {
      const deleteConfirmed = await message.confirm(
        locale.baseText("mainSidebar.confirmMessage.workflowDelete.message", {
          interpolate: { workflowName: props.data.name }
        }),
        locale.baseText("mainSidebar.confirmMessage.workflowDelete.headline"),
        {
          type: "warning",
          confirmButtonText: locale.baseText(
            "mainSidebar.confirmMessage.workflowDelete.confirmButtonText"
          ),
          cancelButtonText: locale.baseText(
            "mainSidebar.confirmMessage.workflowDelete.cancelButtonText"
          )
        }
      );
      if (deleteConfirmed !== MODAL_CONFIRM) {
        return;
      }
      try {
        await workflowsStore.deleteWorkflow(props.data.id);
      } catch (error) {
        toast.showError(error, locale.baseText("generic.deleteWorkflowError"));
        return;
      }
      toast.showMessage({
        title: locale.baseText("mainSidebar.showMessage.handleSelect1.title"),
        type: "success"
      });
      emit("workflow:deleted");
    }
    function moveResource() {
      uiStore.openModalWithData({
        name: PROJECT_MOVE_RESOURCE_MODAL,
        data: {
          resource: props.data,
          resourceType: ResourceType.Workflow,
          resourceTypeLabel: resourceTypeLabel.value,
          eventBus: props.workflowListEventBus
        }
      });
    }
    const emitWorkflowActiveToggle = (value) => {
      emit("workflow:active-toggle", value);
    };
    return (_ctx, _cache) => {
      const _component_N8nBadge = resolveComponent("N8nBadge");
      const _component_n8n_heading = resolveComponent("n8n-heading");
      const _component_n8n_tags = resolveComponent("n8n-tags");
      const _component_n8n_text = resolveComponent("n8n-text");
      const _component_ProjectIcon = __unplugin_components_0$1;
      const _component_n8n_link = resolveComponent("n8n-link");
      const _component_n8n_breadcrumbs = resolveComponent("n8n-breadcrumbs");
      const _component_n8n_action_toggle = resolveComponent("n8n-action-toggle");
      const _component_n8n_card = resolveComponent("n8n-card");
      return openBlock(), createBlock(_component_n8n_card, {
        class: normalizeClass(_ctx.$style.cardLink),
        "data-test-id": "workflow-card",
        onClick
      }, {
        header: withCtx(() => [
          createVNode(_component_n8n_heading, {
            tag: "h2",
            bold: "",
            class: normalizeClass(_ctx.$style.cardHeading),
            "data-test-id": "workflow-card-name"
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(_ctx.data.name) + " ", 1),
              !workflowPermissions.value.update ? (openBlock(), createBlock(_component_N8nBadge, {
                key: 0,
                class: "ml-3xs",
                theme: "tertiary",
                bold: ""
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(unref(locale).baseText("workflows.item.readonly")), 1)
                ]),
                _: 1
              })) : createCommentVNode("", true)
            ]),
            _: 1
          }, 8, ["class"])
        ]),
        append: withCtx(() => [
          createBaseVNode("div", {
            class: normalizeClass(_ctx.$style.cardActions),
            onClick: _cache[0] || (_cache[0] = withModifiers(() => {
            }, ["stop"]))
          }, [
            !_ctx.data.parentFolder ? (openBlock(), createBlock(ProjectCardBadge, {
              key: 0,
              class: normalizeClass(_ctx.$style.cardBadge),
              resource: _ctx.data,
              "resource-type": unref(ResourceType).Workflow,
              "resource-type-label": resourceTypeLabel.value,
              "personal-project": unref(projectsStore).personalProject
            }, null, 8, ["class", "resource", "resource-type", "resource-type-label", "personal-project"])) : (openBlock(), createElementBlock("div", {
              key: 1,
              class: normalizeClass(_ctx.$style.breadcrumbs)
            }, [
              createVNode(_component_n8n_breadcrumbs, {
                items: _ctx.breadcrumbs.visibleItems,
                "hidden-items": _ctx.breadcrumbs.hiddenItems,
                "path-truncated": _ctx.breadcrumbs.visibleItems[0]?.parentFolder,
                "show-border": true,
                "highlight-last-item": false,
                theme: "small",
                "data-test-id": "folder-card-breadcrumbs"
              }, createSlots({ _: 2 }, [
                _ctx.data.homeProject ? {
                  name: "prepend",
                  fn: withCtx(() => [
                    createBaseVNode("div", {
                      class: normalizeClass(_ctx.$style["home-project"])
                    }, [
                      createVNode(_component_n8n_link, {
                        to: `/projects/${_ctx.data.homeProject.id}`
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_ProjectIcon, {
                            icon: projectIcon.value,
                            "border-less": true,
                            size: "mini"
                          }, null, 8, ["icon"]),
                          createVNode(_component_n8n_text, {
                            size: "small",
                            compact: true,
                            bold: true,
                            color: "text-base"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(projectName.value), 1)
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["to"])
                    ], 2)
                  ]),
                  key: "0"
                } : void 0
              ]), 1032, ["items", "hidden-items", "path-truncated"])
            ], 2)),
            createVNode(WorkflowActivator, {
              class: "mr-s",
              "workflow-active": _ctx.data.active,
              "workflow-id": _ctx.data.id,
              "workflow-permissions": workflowPermissions.value,
              "data-test-id": "workflow-card-activator",
              "onUpdate:workflowActive": emitWorkflowActiveToggle
            }, null, 8, ["workflow-active", "workflow-id", "workflow-permissions"]),
            createVNode(_component_n8n_action_toggle, {
              actions: actions.value,
              theme: "dark",
              "data-test-id": "workflow-card-actions",
              onAction
            }, null, 8, ["actions"])
          ], 2)
        ]),
        default: withCtx(() => [
          createBaseVNode("div", {
            class: normalizeClass(_ctx.$style.cardDescription)
          }, [
            createVNode(_component_n8n_text, {
              color: "text-light",
              size: "small"
            }, {
              default: withCtx(() => [
                withDirectives(createBaseVNode("span", null, [
                  createTextVNode(toDisplayString(unref(locale).baseText("workflows.item.updated")) + " ", 1),
                  createVNode(_sfc_main$4, {
                    date: String(_ctx.data.updatedAt)
                  }, null, 8, ["date"]),
                  _cache[1] || (_cache[1] = createTextVNode(" | "))
                ], 512), [
                  [vShow, _ctx.data]
                ]),
                withDirectives(createBaseVNode("span", { class: "mr-2xs" }, toDisplayString(unref(locale).baseText("workflows.item.created")) + " " + toDisplayString(formattedCreatedAtDate.value), 513), [
                  [vShow, _ctx.data]
                ]),
                unref(settingsStore).areTagsEnabled && _ctx.data.tags && _ctx.data.tags.length > 0 ? withDirectives((openBlock(), createElementBlock("span", _hoisted_1$1, [
                  createVNode(_component_n8n_tags, {
                    tags: _ctx.data.tags,
                    "truncate-at": 3,
                    truncate: "",
                    "data-test-id": "workflow-card-tags",
                    "onClick:tag": onClickTag,
                    onExpand: onExpandTags
                  }, null, 8, ["tags"])
                ], 512)), [
                  [vShow, _ctx.data]
                ]) : createCommentVNode("", true)
              ]),
              _: 1
            })
          ], 2)
        ]),
        _: 1
      }, 8, ["class"]);
    };
  }
});
const cardLink = "_cardLink_dsqjo_123";
const cardHeading = "_cardHeading_dsqjo_133";
const cardDescription = "_cardDescription_dsqjo_142";
const cardActions = "_cardActions_dsqjo_149";
const cardBadge = "_cardBadge_dsqjo_176";
const breadcrumbs = "_breadcrumbs_dsqjo_177";
const style0$1 = {
  cardLink,
  cardHeading,
  cardDescription,
  cardActions,
  "home-project": "_home-project_dsqjo_159",
  cardBadge,
  breadcrumbs
};
const cssModules$1 = {
  "$style": style0$1
};
const WorkflowCard = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__cssModules", cssModules$1]]);
const useFoldersStore = defineStore(STORES.FOLDERS, () => {
  const rootStore = useRootStore();
  const totalWorkflowCount = ref(0);
  const breadcrumbsCache = ref({});
  const cacheFolders = (folders) => {
    folders.forEach((folder) => {
      if (!breadcrumbsCache.value[folder.id]) {
        breadcrumbsCache.value[folder.id] = {
          id: folder.id,
          name: folder.name,
          parentFolder: folder.parentFolder
        };
      }
    });
  };
  const getCachedFolder = (folderId) => {
    return breadcrumbsCache.value[folderId];
  };
  async function createFolder$1(name, projectId, parentFolderId) {
    return await createFolder(
      rootStore.restApiContext,
      projectId,
      name,
      parentFolderId
    );
  }
  async function getFolderPath$1(projectId, folderId) {
    const tree = await getFolderPath(rootStore.restApiContext, projectId, folderId);
    const forCache = extractFoldersForCache(tree);
    cacheFolders(forCache);
    return tree;
  }
  function extractFoldersForCache(items, parentFolderId) {
    let result = [];
    items.forEach((item) => {
      result.push({
        id: item.id,
        name: item.name,
        parentFolder: parentFolderId
      });
      if (item.children && item.children.length > 0) {
        const childFolders = extractFoldersForCache(item.children, item.id);
        result = [...result, ...childFolders];
      }
    });
    return result;
  }
  async function fetchTotalWorkflowsAndFoldersCount(projectId) {
    const { count } = await getWorkflowsAndFolders(
      rootStore.restApiContext,
      { projectId },
      { skip: 0, take: 1 },
      true
    );
    totalWorkflowCount.value = count;
    return count;
  }
  return {
    fetchTotalWorkflowsAndFoldersCount,
    breadcrumbsCache,
    cacheFolders,
    getCachedFolder,
    createFolder: createFolder$1,
    getFolderPath: getFolderPath$1,
    totalWorkflowCount
  };
});
const _hoisted_1 = { class: "text-center mt-s" };
const _hoisted_2 = {
  key: 0,
  class: "mb-s"
};
const _hoisted_3 = { class: "mb-s" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "WorkflowsView",
  setup(__props) {
    const StatusFilter = {
      ACTIVE: "active",
      DEACTIVATED: "deactivated",
      ALL: ""
    };
    const WORKFLOWS_SORT_MAP = {
      lastUpdated: "updatedAt:desc",
      lastCreated: "createdAt:desc",
      nameAsc: "name:asc",
      nameDesc: "name:desc"
    };
    const i18n = useI18n();
    const route = useRoute();
    const router = useRouter();
    const message = useMessage();
    const toast = useToast();
    const sourceControlStore = useSourceControlStore();
    const usersStore = useUsersStore();
    const workflowsStore = useWorkflowsStore();
    const settingsStore = useSettingsStore();
    const posthogStore = usePostHog();
    const projectsStore = useProjectsStore();
    const telemetry = useTelemetry();
    const uiStore = useUIStore();
    const tagsStore = useTagsStore();
    const foldersStore = useFoldersStore();
    const documentTitle = useDocumentTitle();
    const { callDebounced } = useDebounce();
    const loading = ref(false);
    const breadcrumbsLoading = ref(false);
    const filters = ref({
      search: "",
      homeProject: "",
      status: StatusFilter.ALL,
      tags: []
    });
    const workflowListEventBus = createEventBus();
    const workflowsAndFolders = ref([]);
    const easyAICalloutVisible = ref(true);
    const currentPage = ref(1);
    const pageSize = ref(DEFAULT_WORKFLOW_PAGE_SIZE);
    const currentSort = ref("updatedAt:desc");
    const currentFolderId = ref(null);
    const folderActions = ref([
      {
        label: "Open",
        value: FOLDER_LIST_ITEM_ACTIONS.OPEN,
        disabled: false,
        onlyAvailableOn: "card"
      },
      {
        label: "Create Folder",
        value: FOLDER_LIST_ITEM_ACTIONS.CREATE,
        disabled: false
      },
      {
        label: "Create Workflow",
        value: FOLDER_LIST_ITEM_ACTIONS.CREATE_WORKFLOW,
        disabled: false
      },
      {
        label: "Rename",
        value: FOLDER_LIST_ITEM_ACTIONS.RENAME,
        disabled: true
      },
      {
        label: "Move to Folder",
        value: FOLDER_LIST_ITEM_ACTIONS.MOVE,
        disabled: true
      },
      {
        label: "Change Owner",
        value: FOLDER_LIST_ITEM_ACTIONS.CHOWN,
        disabled: true
      },
      {
        label: "Manage Tags",
        value: FOLDER_LIST_ITEM_ACTIONS.TAGS,
        disabled: true
      },
      {
        label: "Delete",
        value: FOLDER_LIST_ITEM_ACTIONS.DELETE,
        disabled: true
      }
    ]);
    const folderCardActions = computed(
      () => folderActions.value.filter(
        (action) => !action.onlyAvailableOn || action.onlyAvailableOn === "card"
      )
    );
    const mainBreadcrumbsActions = computed(
      () => folderActions.value.filter(
        (action) => !action.onlyAvailableOn || action.onlyAvailableOn === "mainBreadcrumbs"
      )
    );
    const readOnlyEnv = computed(() => sourceControlStore.preferences.branchReadOnly);
    const foldersEnabled = computed(() => settingsStore.settings.folders.enabled);
    const isOverviewPage = computed(() => route.name === VIEWS.WORKFLOWS);
    const currentUser = computed(() => usersStore.currentUser ?? {});
    const isShareable = computed(
      () => settingsStore.isEnterpriseFeatureEnabled[EnterpriseEditionFeature.Sharing]
    );
    const showFolders = computed(() => foldersEnabled.value && !isOverviewPage.value);
    const currentFolder = computed(() => {
      return currentFolderId.value ? foldersStore.breadcrumbsCache[currentFolderId.value] : null;
    });
    const currentProject = computed(() => projectsStore.currentProject);
    const projectName = computed(() => {
      if (currentProject.value?.type === ProjectTypes.Personal) {
        return i18n.baseText("projects.menu.personal");
      }
      return currentProject.value?.name;
    });
    const currentParentName = computed(() => {
      if (currentFolder.value) {
        return currentFolder.value.name;
      }
      return projectName.value;
    });
    const workflowListResources = computed(() => {
      const resources = (workflowsAndFolders.value || []).map((resource) => {
        if (resource.resource === "folder") {
          return {
            resourceType: "folder",
            id: resource.id,
            name: resource.name,
            createdAt: resource.createdAt.toString(),
            updatedAt: resource.updatedAt.toString(),
            homeProject: resource.homeProject,
            sharedWithProjects: resource.sharedWithProjects,
            workflowCount: resource.workflowCount,
            parentFolder: resource.parentFolder
          };
        } else {
          return {
            resourceType: "workflow",
            id: resource.id,
            name: resource.name,
            active: resource.active ?? false,
            updatedAt: resource.updatedAt.toString(),
            createdAt: resource.createdAt.toString(),
            homeProject: resource.homeProject,
            scopes: resource.scopes,
            sharedWithProjects: resource.sharedWithProjects,
            readOnly: !getResourcePermissions(resource.scopes).workflow.update,
            tags: resource.tags,
            parentFolder: resource.parentFolder
          };
        }
      });
      return resources;
    });
    const statusFilterOptions = computed(() => [
      {
        label: i18n.baseText("workflows.filters.status.all"),
        value: StatusFilter.ALL
      },
      {
        label: i18n.baseText("workflows.filters.status.active"),
        value: StatusFilter.ACTIVE
      },
      {
        label: i18n.baseText("workflows.filters.status.deactivated"),
        value: StatusFilter.DEACTIVATED
      }
    ]);
    const showEasyAIWorkflowCallout = computed(() => {
      const isEasyAIWorkflowExperimentEnabled = posthogStore.getVariant(EASY_AI_WORKFLOW_EXPERIMENT.name) === EASY_AI_WORKFLOW_EXPERIMENT.variant;
      const easyAIWorkflowOnboardingDone = usersStore.isEasyAIWorkflowOnboardingDone;
      return isEasyAIWorkflowExperimentEnabled && !easyAIWorkflowOnboardingDone;
    });
    const projectPermissions = computed(() => {
      return getResourcePermissions(
        projectsStore.currentProject?.scopes ?? projectsStore.personalProject?.scopes
      );
    });
    const emptyListDescription = computed(() => {
      if (readOnlyEnv.value) {
        return i18n.baseText("workflows.empty.description.readOnlyEnv");
      } else if (!projectPermissions.value.workflow.create) {
        return i18n.baseText("workflows.empty.description.noPermission");
      } else {
        return i18n.baseText("workflows.empty.description");
      }
    });
    watch(
      () => route.params?.projectId,
      async () => {
        await initialize();
      }
    );
    watch(
      () => route.params?.folderId,
      async (newVal) => {
        currentFolderId.value = newVal;
        await fetchWorkflows();
      }
    );
    sourceControlStore.$onAction(({ name, after }) => {
      if (name !== "pullWorkfolder") return;
      after(async () => await initialize());
    });
    onMounted(async () => {
      documentTitle.set(i18n.baseText("workflows.heading"));
      void usersStore.showPersonalizationSurvey();
      workflowListEventBus.on("resource-moved", fetchWorkflows);
      workflowListEventBus.on("workflow-duplicated", fetchWorkflows);
    });
    onBeforeUnmount(() => {
      workflowListEventBus.off("resource-moved", fetchWorkflows);
      workflowListEventBus.off("workflow-duplicated", fetchWorkflows);
    });
    const initialize = async () => {
      loading.value = true;
      await setFiltersFromQueryString();
      if (!route.params.folderId) {
        currentFolderId.value = null;
      }
      const [, resourcesPage] = await Promise.all([
        usersStore.fetchUsers(),
        fetchWorkflows(),
        workflowsStore.fetchActiveWorkflows()
      ]);
      breadcrumbsLoading.value = false;
      workflowsAndFolders.value = resourcesPage;
      loading.value = false;
    };
    const fetchWorkflows = async () => {
      const delayedLoading = debounce(() => {
        loading.value = true;
      }, 300);
      const routeProjectId = route.params?.projectId;
      const homeProjectFilter = filters.value.homeProject || void 0;
      const parentFolder = route.params?.folderId || void 0;
      const fetchedResources = await workflowsStore.fetchWorkflowsPage(
        routeProjectId ?? homeProjectFilter,
        currentPage.value,
        pageSize.value,
        currentSort.value,
        {
          name: filters.value.search || void 0,
          active: filters.value.status === StatusFilter.ALL ? void 0 : filters.value.status === StatusFilter.ACTIVE,
          tags: filters.value.tags.map((tagId) => tagsStore.tagsById[tagId]?.name),
          parentFolderId: parentFolder ?? "0"
          // 0 is the root folder in the API
        },
        showFolders.value
      );
      foldersStore.cacheFolders(
        fetchedResources.filter((resource) => resource.resource === "folder").map((r) => ({ id: r.id, name: r.name, parentFolder: r.parentFolder?.id }))
      );
      const isCurrentFolderCached = foldersStore.breadcrumbsCache[parentFolder ?? ""] !== void 0;
      const needToFetchFolderPath = parentFolder && !isCurrentFolderCached && routeProjectId;
      if (needToFetchFolderPath) {
        breadcrumbsLoading.value = true;
        await foldersStore.getFolderPath(routeProjectId, parentFolder);
        currentFolderId.value = parentFolder;
        breadcrumbsLoading.value = false;
      }
      await foldersStore.fetchTotalWorkflowsAndFoldersCount(routeProjectId);
      delayedLoading.cancel();
      workflowsAndFolders.value = fetchedResources;
      loading.value = false;
      return fetchedResources;
    };
    const onSortUpdated = async (sort) => {
      currentSort.value = WORKFLOWS_SORT_MAP[sort] ?? "updatedAt:desc";
      if (currentSort.value !== "updatedAt:desc") {
        void router.replace({ query: { ...route.query, sort } });
      } else {
        void router.replace({ query: { ...route.query, sort: void 0 } });
      }
      await fetchWorkflows();
    };
    const onFiltersUpdated = async () => {
      currentPage.value = 1;
      saveFiltersOnQueryString();
      await fetchWorkflows();
    };
    const onSearchUpdated = async (search) => {
      currentPage.value = 1;
      saveFiltersOnQueryString();
      if (search) {
        await callDebounced(fetchWorkflows, { debounceTime: 500, trailing: true });
      } else {
        await fetchWorkflows();
      }
    };
    const setCurrentPage = async (page) => {
      currentPage.value = page;
      await fetchWorkflows();
    };
    const setPageSize = async (size) => {
      pageSize.value = size;
      await fetchWorkflows();
    };
    const onClickTag = async (tagId) => {
      if (!filters.value.tags.includes(tagId)) {
        filters.value.tags.push(tagId);
        currentPage.value = 1;
        saveFiltersOnQueryString();
        await fetchWorkflows();
      }
    };
    const saveFiltersOnQueryString = () => {
      const currentQuery = { ...route.query };
      if (filters.value.search) {
        currentQuery.search = filters.value.search;
      } else {
        delete currentQuery.search;
      }
      if (filters.value.status !== StatusFilter.ALL) {
        currentQuery.status = (filters.value.status === StatusFilter.ACTIVE).toString();
      } else {
        delete currentQuery.status;
      }
      if (filters.value.tags.length) {
        currentQuery.tags = filters.value.tags.join(",");
      } else {
        delete currentQuery.tags;
      }
      if (filters.value.homeProject) {
        currentQuery.homeProject = filters.value.homeProject;
      } else {
        delete currentQuery.homeProject;
      }
      void router.replace({
        query: Object.keys(currentQuery).length ? currentQuery : void 0
      });
    };
    const setFiltersFromQueryString = async () => {
      const newQuery = { ...route.query };
      const { tags, status, search, homeProject, sort } = route.query ?? {};
      const isValidString = (value) => typeof value === "string" && value.trim().length > 0;
      if (isValidString(homeProject)) {
        await projectsStore.getAvailableProjects();
        if (isValidProjectId(homeProject)) {
          newQuery.homeProject = homeProject;
          filters.value.homeProject = homeProject;
        } else {
          delete newQuery.homeProject;
        }
      } else {
        delete newQuery.homeProject;
      }
      if (isValidString(search)) {
        newQuery.search = search;
        filters.value.search = search;
      } else {
        delete newQuery.search;
      }
      if (isValidString(tags)) {
        await tagsStore.fetchAll();
        const validTags = tags.split(",").filter((tag) => tagsStore.allTags.map((t) => t.id).includes(tag));
        if (validTags.length) {
          newQuery.tags = validTags.join(",");
          filters.value.tags = validTags;
        } else {
          delete newQuery.tags;
        }
      } else {
        delete newQuery.tags;
      }
      const validStatusValues = ["true", "false"];
      if (isValidString(status) && validStatusValues.includes(status)) {
        newQuery.status = status;
        filters.value.status = status === "true" ? StatusFilter.ACTIVE : StatusFilter.DEACTIVATED;
      } else {
        delete newQuery.status;
      }
      if (isValidString(sort)) {
        const newSort = WORKFLOWS_SORT_MAP[sort] ?? "updatedAt:desc";
        newQuery.sort = sort;
        currentSort.value = newSort;
      } else {
        delete newQuery.sort;
      }
      void router.replace({ query: newQuery });
    };
    const addWorkflow = () => {
      uiStore.nodeViewInitialized = false;
      void router.push({
        name: VIEWS.NEW_WORKFLOW,
        query: { projectId: route.params?.projectId, parentFolderId: route.params?.folderId }
      });
      telemetry.track("User clicked add workflow button", {
        source: "Workflows list"
      });
      trackEmptyCardClick("blank");
    };
    const trackEmptyCardClick = (option) => {
      telemetry.track("User clicked empty page option", {
        option
      });
    };
    function isValidProjectId(projectId) {
      return projectsStore.availableProjects.some((project) => project.id === projectId);
    }
    const openAIWorkflow = async (source) => {
      dismissEasyAICallout();
      telemetry.track(
        "User clicked test AI workflow",
        {
          source
        },
        { withPostHog: true }
      );
      const isAiCreditsExperimentEnabled = posthogStore.getVariant(AI_CREDITS_EXPERIMENT.name) === AI_CREDITS_EXPERIMENT.variant;
      const easyAiWorkflowJson = getEasyAiWorkflowJson({
        isInstanceInAiFreeCreditsExperiment: isAiCreditsExperimentEnabled,
        withOpenAiFreeCredits: settingsStore.aiCreditsQuota
      });
      await router.push({
        name: VIEWS.TEMPLATE_IMPORT,
        params: { id: easyAiWorkflowJson.meta.templateId },
        query: { fromJson: "true", parentFolderId: route.params.folderId }
      });
    };
    const dismissEasyAICallout = () => {
      easyAICalloutVisible.value = false;
    };
    const onWorkflowActiveToggle = (data) => {
      const workflow = workflowsAndFolders.value.find(
        (w) => w.id === data.id
      );
      if (!workflow) return;
      workflow.active = data.active;
    };
    const visibleBreadcrumbsItems = computed(() => {
      if (!currentFolder.value) return [];
      const items = [];
      const parent = foldersStore.getCachedFolder(currentFolder.value.parentFolder ?? "");
      if (parent) {
        items.push({
          id: parent.id,
          label: parent.name,
          href: `/projects/${route.params.projectId}/folders/${parent.id}/workflows`,
          parentFolder: parent.parentFolder
        });
      }
      items.push({
        id: currentFolder.value.id,
        label: currentFolder.value.name,
        parentFolder: parent?.parentFolder
      });
      return items;
    });
    const hiddenBreadcrumbsItems = computed(() => {
      const lastVisibleParent = visibleBreadcrumbsItems.value[visibleBreadcrumbsItems.value.length - 1];
      if (!lastVisibleParent) return [];
      const items = [];
      let parentFolder = lastVisibleParent.parentFolder;
      while (parentFolder) {
        const parent = foldersStore.getCachedFolder(parentFolder);
        if (!parent) break;
        items.unshift({
          id: parent.id,
          label: parent.name,
          href: `/projects/${route.params.projectId}/folders/${parent.id}/workflows`,
          parentFolder: parent.parentFolder
        });
        parentFolder = parent.parentFolder;
      }
      return items;
    });
    const mainBreadcrumbs = computed(() => {
      return {
        visibleItems: visibleBreadcrumbsItems.value,
        hiddenItems: hiddenBreadcrumbsItems.value
      };
    });
    const cardBreadcrumbs = computed(() => {
      const visibleItems = visibleBreadcrumbsItems.value;
      const hiddenItems = hiddenBreadcrumbsItems.value;
      if (visibleItems.length > 1) {
        return {
          visibleItems: [visibleItems[visibleItems.length - 1]],
          hiddenItems: [...hiddenItems, ...visibleItems.slice(0, visibleItems.length - 1)]
        };
      }
      return {
        visibleItems,
        hiddenItems
      };
    });
    const onBreadcrumbItemClick = (item) => {
      if (item.href) {
        loading.value = true;
        void router.push(item.href).then(() => {
          currentFolderId.value = item.id;
          loading.value = false;
        }).catch((error) => {
          toast.showError(error, "Error navigating to folder");
        });
      }
    };
    const onBreadCrumbsAction = async (action) => {
      switch (action) {
        case FOLDER_LIST_ITEM_ACTIONS.CREATE:
          if (!route.params.projectId) return;
          const currentParent = currentFolder.value?.name || projectName.value;
          if (!currentParent) return;
          await createFolder2({
            id: route.params.folderId ?? "-1",
            name: currentParent,
            type: currentFolder.value ? "folder" : "project"
          });
          break;
        case FOLDER_LIST_ITEM_ACTIONS.CREATE_WORKFLOW:
          addWorkflow();
          break;
      }
    };
    const onFolderCardAction = async (payload) => {
      const clickedFolder = foldersStore.getCachedFolder(payload.folderId);
      if (!clickedFolder) return;
      switch (payload.action) {
        case FOLDER_LIST_ITEM_ACTIONS.CREATE:
          await createFolder2({
            id: clickedFolder.id,
            name: clickedFolder.name,
            type: "folder"
          });
          break;
        case FOLDER_LIST_ITEM_ACTIONS.CREATE_WORKFLOW:
          currentFolderId.value = clickedFolder.id;
          void router.push({
            name: VIEWS.NEW_WORKFLOW,
            query: { projectId: route.params?.projectId, parentFolderId: clickedFolder.id }
          });
          break;
      }
    };
    const createFolder2 = async (parent) => {
      const promptResponsePromise = message.prompt(
        i18n.baseText("folders.add.to.parent.message", { interpolate: { parent: parent.name } }),
        {
          confirmButtonText: i18n.baseText("generic.create"),
          cancelButtonText: i18n.baseText("generic.cancel"),
          inputErrorMessage: i18n.baseText("folders.add.invalidName.message"),
          inputValue: "",
          inputPattern: /^[a-zA-Z0-9-_ ]{1,100}$/,
          customClass: "add-folder-modal"
        }
      );
      const promptResponse = await promptResponsePromise;
      if (promptResponse.action === MODAL_CONFIRM) {
        const folderName = promptResponse.value;
        try {
          const newFolder = await foldersStore.createFolder(
            folderName,
            route.params.projectId,
            parent.type === "folder" ? parent.id : void 0
          );
          let newFolderURL = `/projects/${route.params.projectId}`;
          if (newFolder.parentFolder) {
            newFolderURL = `/projects/${route.params.projectId}/folders/${newFolder.id}/workflows`;
          }
          toast.showMessage({
            title: i18n.baseText("folders.add.success.title"),
            message: i18n.baseText("folders.add.success.message", {
              interpolate: {
                link: newFolderURL,
                name: newFolder.name
              }
            }),
            type: "success"
          });
          if (!workflowsAndFolders.value.length) {
            workflowsAndFolders.value = [
              {
                id: newFolder.id,
                name: newFolder.name,
                resource: "folder",
                createdAt: newFolder.createdAt,
                updatedAt: newFolder.updatedAt,
                homeProject: projectsStore.currentProject,
                sharedWithProjects: [],
                workflowCount: 0
              }
            ];
          } else {
            await fetchWorkflows();
          }
        } catch (error) {
          toast.showError(error, "Error creating folder");
        }
      }
    };
    const createFolderInCurrent = async () => {
      if (!route.params.projectId) return;
      const currentParent = currentFolder.value?.name || projectName.value;
      if (!currentParent) return;
      await createFolder2({
        id: route.params.folderId ?? "-1",
        name: currentParent,
        type: currentFolder.value ? "folder" : "project"
      });
    };
    return (_ctx, _cache) => {
      const _component_N8nButton = resolveComponent("N8nButton");
      const _component_N8nTooltip = resolveComponent("N8nTooltip");
      const _component_n8n_button = resolveComponent("n8n-button");
      const _component_N8nCallout = resolveComponent("N8nCallout");
      const _component_n8n_loading = resolveComponent("n8n-loading");
      const _component_FolderBreadcrumbs = __unplugin_components_0;
      const _component_FolderCard = __unplugin_components_1;
      return openBlock(), createBlock(ResourcesListLayout, {
        filters: filters.value,
        "onUpdate:filters": [
          _cache[2] || (_cache[2] = ($event) => filters.value = $event),
          onFiltersUpdated
        ],
        "resource-key": "workflows",
        type: "list-paginated",
        resources: workflowListResources.value,
        "type-props": { itemSize: 80 },
        shareable: isShareable.value,
        initialize,
        disabled: readOnlyEnv.value || !projectPermissions.value.workflow.create,
        loading: false,
        "resources-refreshing": loading.value,
        "custom-page-size": unref(DEFAULT_WORKFLOW_PAGE_SIZE),
        "total-items": unref(workflowsStore).totalWorkflowCount,
        "dont-perform-sorting-and-filtering": true,
        "onClick:add": addWorkflow,
        "onUpdate:search": onSearchUpdated,
        "onUpdate:currentPage": setCurrentPage,
        "onUpdate:pageSize": setPageSize,
        onSort: onSortUpdated
      }, createSlots({
        header: withCtx(() => [
          createVNode(ProjectHeader, { onCreateFolder: createFolderInCurrent })
        ]),
        callout: withCtx(() => [
          showEasyAIWorkflowCallout.value && easyAICalloutVisible.value ? (openBlock(), createBlock(_component_N8nCallout, {
            key: 0,
            theme: "secondary",
            icon: "robot",
            class: normalizeClass(_ctx.$style["easy-ai-workflow-callout"])
          }, {
            trailingContent: withCtx(() => [
              createBaseVNode("div", {
                class: normalizeClass(_ctx.$style["callout-trailing-content"])
              }, [
                createVNode(_component_n8n_button, {
                  "data-test-id": "easy-ai-button",
                  size: "small",
                  type: "secondary",
                  onClick: _cache[0] || (_cache[0] = ($event) => openAIWorkflow("callout"))
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(unref(i18n).baseText("generic.tryNow")), 1)
                  ]),
                  _: 1
                }),
                createVNode(unref(N8nIcon), {
                  size: "small",
                  icon: "times",
                  title: unref(i18n).baseText("generic.dismiss"),
                  class: "clickable",
                  onClick: dismissEasyAICallout
                }, null, 8, ["title"])
              ], 2)
            ]),
            default: withCtx(() => [
              createTextVNode(toDisplayString(unref(i18n).baseText("workflows.list.easyAI")) + " ", 1)
            ]),
            _: 1
          }, 8, ["class"])) : createCommentVNode("", true)
        ]),
        breadcrumbs: withCtx(() => [
          breadcrumbsLoading.value ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: normalizeClass(_ctx.$style["breadcrumbs-loading"])
          }, [
            createVNode(_component_n8n_loading, {
              loading: breadcrumbsLoading.value,
              rows: 1,
              variant: "p"
            }, null, 8, ["loading"])
          ], 2)) : showFolders.value && currentFolder.value ? (openBlock(), createElementBlock("div", {
            key: 1,
            class: normalizeClass(_ctx.$style["breadcrumbs-container"])
          }, [
            createVNode(_component_FolderBreadcrumbs, {
              breadcrumbs: mainBreadcrumbs.value,
              actions: mainBreadcrumbsActions.value,
              onItemSelected: onBreadcrumbItemClick,
              onAction: onBreadCrumbsAction
            }, null, 8, ["breadcrumbs", "actions"])
          ], 2)) : createCommentVNode("", true)
        ]),
        item: withCtx(({ item: data }) => [
          data.resourceType === "folder" ? (openBlock(), createBlock(_component_FolderCard, {
            key: 0,
            data,
            actions: folderCardActions.value,
            breadcrumbs: cardBreadcrumbs.value,
            class: "mb-2xs",
            onAction: onFolderCardAction
          }, null, 8, ["data", "actions", "breadcrumbs"])) : (openBlock(), createBlock(WorkflowCard, {
            key: 1,
            "data-test-id": "resources-list-item",
            class: "mb-2xs",
            data,
            breadcrumbs: cardBreadcrumbs.value,
            "workflow-list-event-bus": unref(workflowListEventBus),
            "read-only": readOnlyEnv.value,
            "onClick:tag": onClickTag,
            "onWorkflow:deleted": fetchWorkflows,
            "onWorkflow:moved": fetchWorkflows,
            "onWorkflow:duplicated": fetchWorkflows,
            "onWorkflow:activeToggle": onWorkflowActiveToggle
          }, null, 8, ["data", "breadcrumbs", "workflow-list-event-bus", "read-only"]))
        ]),
        empty: withCtx(() => [
          createBaseVNode("div", _hoisted_1, [
            createVNode(unref(N8nHeading), {
              tag: "h2",
              size: "xlarge",
              class: "mb-2xs"
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(currentUser.value.firstName ? unref(i18n).baseText("workflows.empty.heading", {
                  interpolate: { name: currentUser.value.firstName }
                }) : unref(i18n).baseText("workflows.empty.heading.userNotSetup")), 1)
              ]),
              _: 1
            }),
            createVNode(unref(N8nText), {
              size: "large",
              color: "text-base"
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(emptyListDescription.value), 1)
              ]),
              _: 1
            })
          ]),
          !readOnlyEnv.value && projectPermissions.value.workflow.create ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: normalizeClass(["text-center", "mt-2xl", _ctx.$style.actionsContainer])
          }, [
            createVNode(unref(N8nCard), {
              class: normalizeClass(_ctx.$style.emptyStateCard),
              hoverable: "",
              "data-test-id": "new-workflow-card",
              onClick: addWorkflow
            }, {
              default: withCtx(() => [
                createVNode(unref(N8nIcon), {
                  class: normalizeClass(_ctx.$style.emptyStateCardIcon),
                  icon: "file"
                }, null, 8, ["class"]),
                createVNode(unref(N8nText), {
                  size: "large",
                  class: "mt-xs",
                  color: "text-dark"
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(unref(i18n).baseText("workflows.empty.startFromScratch")), 1)
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["class"]),
            showEasyAIWorkflowCallout.value ? (openBlock(), createBlock(unref(N8nCard), {
              key: 0,
              class: normalizeClass(_ctx.$style.emptyStateCard),
              hoverable: "",
              "data-test-id": "easy-ai-workflow-card",
              onClick: _cache[1] || (_cache[1] = ($event) => openAIWorkflow("empty"))
            }, {
              default: withCtx(() => [
                createVNode(unref(N8nIcon), {
                  class: normalizeClass(_ctx.$style.emptyStateCardIcon),
                  icon: "robot"
                }, null, 8, ["class"]),
                createVNode(unref(N8nText), {
                  size: "large",
                  class: "mt-xs pl-2xs pr-2xs",
                  color: "text-dark"
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(unref(i18n).baseText("workflows.empty.easyAI")), 1)
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["class"])) : createCommentVNode("", true)
          ], 2)) : createCommentVNode("", true)
        ]),
        filters: withCtx(({ setKeyValue }) => [
          unref(settingsStore).areTagsEnabled ? (openBlock(), createElementBlock("div", _hoisted_2, [
            createVNode(unref(N8nInputLabel), {
              label: unref(i18n).baseText("workflows.filters.tags"),
              bold: false,
              size: "small",
              color: "text-base",
              class: "mb-3xs"
            }, null, 8, ["label"]),
            createVNode(_sfc_main$5, {
              placeholder: unref(i18n).baseText("workflowOpen.filterWorkflows"),
              "model-value": filters.value.tags,
              "create-enabled": false,
              "onUpdate:modelValue": ($event) => setKeyValue("tags", $event)
            }, null, 8, ["placeholder", "model-value", "onUpdate:modelValue"])
          ])) : createCommentVNode("", true),
          createBaseVNode("div", _hoisted_3, [
            createVNode(unref(N8nInputLabel), {
              label: unref(i18n).baseText("workflows.filters.status"),
              bold: false,
              size: "small",
              color: "text-base",
              class: "mb-3xs"
            }, null, 8, ["label"]),
            createVNode(unref(N8nSelect), {
              "data-test-id": "status-dropdown",
              "model-value": filters.value.status,
              "onUpdate:modelValue": ($event) => setKeyValue("status", $event)
            }, {
              default: withCtx(() => [
                (openBlock(true), createElementBlock(Fragment, null, renderList(statusFilterOptions.value, (option) => {
                  return openBlock(), createBlock(unref(_sfc_main$6), {
                    key: option.label,
                    label: option.label,
                    value: option.value,
                    "data-test-id": "status"
                  }, null, 8, ["label", "value"]);
                }), 128))
              ]),
              _: 2
            }, 1032, ["model-value", "onUpdate:modelValue"])
          ])
        ]),
        _: 2
      }, [
        showFolders.value ? {
          name: "add-button",
          fn: withCtx(() => [
            createVNode(_component_N8nTooltip, { placement: "top" }, {
              content: withCtx(() => [
                createTextVNode(toDisplayString(currentParentName.value ? unref(i18n).baseText("folders.add.to.parent.message", {
                  interpolate: { parent: currentParentName.value }
                }) : unref(i18n).baseText("folders.add.here.message")), 1)
              ]),
              default: withCtx(() => [
                createVNode(_component_N8nButton, {
                  size: "large",
                  icon: "folder-plus",
                  type: "tertiary",
                  "data-test-id": "add-folder-button",
                  class: normalizeClass(_ctx.$style["add-folder-button"]),
                  onClick: createFolderInCurrent
                }, null, 8, ["class"])
              ]),
              _: 1
            })
          ]),
          key: "0"
        } : void 0
      ]), 1032, ["filters", "resources", "shareable", "disabled", "resources-refreshing", "custom-page-size", "total-items"]);
    };
  }
});
const actionsContainer = "_actionsContainer_j58pl_123";
const emptyStateCard = "_emptyStateCard_j58pl_139";
const emptyStateCardIcon = "_emptyStateCardIcon_j58pl_152";
const style0 = {
  actionsContainer,
  "easy-ai-workflow-callout": "_easy-ai-workflow-callout_j58pl_128",
  "callout-trailing-content": "_callout-trailing-content_j58pl_133",
  emptyStateCard,
  emptyStateCardIcon,
  "add-folder-button": "_add-folder-button_j58pl_161",
  "breadcrumbs-container": "_breadcrumbs-container_j58pl_165",
  "breadcrumbs-loading": "_breadcrumbs-loading_j58pl_170"
};
const cssModules = {
  "$style": style0
};
const WorkflowsView = /* @__PURE__ */ _export_sfc(_sfc_main, [["__cssModules", cssModules]]);
export {
  WorkflowsView as default
};
