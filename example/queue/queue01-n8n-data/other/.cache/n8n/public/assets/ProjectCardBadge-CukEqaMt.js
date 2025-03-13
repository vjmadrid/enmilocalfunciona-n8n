import { d as defineComponent, q as computed, g9 as ProjectTypes, gl as splitName, m as resolveComponent, bW as resolveDirective, c as openBlock, e as createBlock, w as withCtx, k as createTextVNode, t as toDisplayString, j as createBaseVNode, b0 as mergeProps, n as normalizeClass, i as createVNode, ax as withDirectives, h as createElementBlock, f as createCommentVNode, g as useI18n, ga as __unplugin_components_0, _ as _export_sfc } from "./index-DkwrpQEB.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ProjectCardBadge",
  props: {
    resource: {},
    resourceType: {},
    resourceTypeLabel: {},
    personalProject: {}
  },
  setup(__props) {
    const props = __props;
    const i18n = useI18n();
    const projectState = computed(() => {
      if (props.resource.homeProject && props.personalProject && props.resource.homeProject.id === props.personalProject.id || !props.resource.homeProject) {
        if (props.resource.sharedWithProjects?.length) {
          return "shared-owned";
        }
        return "owned";
      } else if (props.resource.homeProject?.type !== ProjectTypes.Team) {
        if (props.resource.sharedWithProjects?.length) {
          return "shared-personal";
        }
        return "personal";
      } else if (props.resource.homeProject?.type === ProjectTypes.Team) {
        if (props.resource.sharedWithProjects?.length) {
          return "shared-team";
        }
        return "team";
      }
      return "unknown";
    });
    const numberOfMembersInHomeTeamProject = computed(
      () => props.resource.sharedWithProjects?.length ?? 0
    );
    const badgeText = computed(() => {
      if (projectState.value === "owned" || projectState.value === "shared-owned") {
        return i18n.baseText("projects.menu.personal");
      } else {
        const { name, email } = splitName(props.resource.homeProject?.name ?? "");
        return name ?? email ?? "";
      }
    });
    const badgeIcon = computed(() => {
      switch (projectState.value) {
        case "owned":
        case "shared-owned":
          return { type: "icon", value: "user" };
        case "team":
        case "shared-team":
          return props.resource.homeProject?.icon ?? { type: "icon", value: "layer-group" };
        default:
          return { type: "icon", value: "layer-group" };
      }
    });
    const badgeTooltip = computed(() => {
      switch (projectState.value) {
        case "shared-owned":
          return i18n.baseText("projects.badge.tooltip.sharedOwned", {
            interpolate: {
              resourceTypeLabel: props.resourceTypeLabel,
              count: numberOfMembersInHomeTeamProject.value
            }
          });
        case "shared-personal":
          return i18n.baseText("projects.badge.tooltip.sharedPersonal", {
            interpolate: {
              resourceTypeLabel: props.resourceTypeLabel,
              name: badgeText.value,
              count: numberOfMembersInHomeTeamProject.value
            }
          });
        case "personal":
          return i18n.baseText("projects.badge.tooltip.personal", {
            interpolate: {
              resourceTypeLabel: props.resourceTypeLabel,
              name: badgeText.value
            }
          });
        case "team":
          return i18n.baseText("projects.badge.tooltip.team", {
            interpolate: {
              resourceTypeLabel: props.resourceTypeLabel,
              name: badgeText.value
            }
          });
        case "shared-team":
          return i18n.baseText("projects.badge.tooltip.sharedTeam", {
            interpolate: {
              resourceTypeLabel: props.resourceTypeLabel,
              name: badgeText.value,
              count: numberOfMembersInHomeTeamProject.value
            }
          });
        default:
          return "";
      }
    });
    return (_ctx, _cache) => {
      const _component_ProjectIcon = __unplugin_components_0;
      const _component_N8nBadge = resolveComponent("N8nBadge");
      const _component_N8nTooltip = resolveComponent("N8nTooltip");
      const _directive_n8n_truncate = resolveDirective("n8n-truncate");
      return openBlock(), createBlock(_component_N8nTooltip, {
        disabled: !badgeTooltip.value,
        placement: "top"
      }, {
        content: withCtx(() => [
          createTextVNode(toDisplayString(badgeTooltip.value), 1)
        ]),
        default: withCtx(() => [
          createBaseVNode("div", mergeProps({
            class: _ctx.$style.wrapper
          }, _ctx.$attrs), [
            badgeText.value ? (openBlock(), createBlock(_component_N8nBadge, {
              key: 0,
              class: normalizeClass([_ctx.$style.badge, _ctx.$style.projectBadge]),
              theme: "tertiary",
              bold: "",
              "data-test-id": "card-badge"
            }, {
              default: withCtx(() => [
                createVNode(_component_ProjectIcon, {
                  icon: badgeIcon.value,
                  "border-less": true,
                  size: "mini"
                }, null, 8, ["icon"]),
                withDirectives((openBlock(), createElementBlock("span", null, [
                  createTextVNode(toDisplayString(badgeText.value), 1)
                ])), [
                  [_directive_n8n_truncate, void 0, "20"]
                ])
              ]),
              _: 1
            }, 8, ["class"])) : createCommentVNode("", true),
            numberOfMembersInHomeTeamProject.value ? (openBlock(), createBlock(_component_N8nBadge, {
              key: 1,
              class: normalizeClass([_ctx.$style.badge, _ctx.$style.countBadge]),
              theme: "tertiary",
              bold: ""
            }, {
              default: withCtx(() => [
                createTextVNode(" + " + toDisplayString(numberOfMembersInHomeTeamProject.value), 1)
              ]),
              _: 1
            }, 8, ["class"])) : createCommentVNode("", true)
          ], 16)
        ]),
        _: 1
      }, 8, ["disabled"]);
    };
  }
});
const wrapper = "_wrapper_1ucbn_123";
const badge = "_badge_1ucbn_127";
const projectBadge = "_projectBadge_1ucbn_139";
const countBadge = "_countBadge_1ucbn_144";
const style0 = {
  wrapper,
  badge,
  projectBadge,
  countBadge
};
const cssModules = {
  "$style": style0
};
const ProjectCardBadge = /* @__PURE__ */ _export_sfc(_sfc_main, [["__cssModules", cssModules]]);
export {
  ProjectCardBadge as P
};
