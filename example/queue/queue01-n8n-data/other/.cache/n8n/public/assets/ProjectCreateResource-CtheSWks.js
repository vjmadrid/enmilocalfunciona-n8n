import { d as defineComponent, r as ref, c as openBlock, h as createElementBlock, v as renderSlot, i as createVNode, w as withCtx, l as unref, aR as _sfc_main$1, n as normalizeClass, fK as N8nActionToggle, _ as _export_sfc } from "./index-DkwrpQEB.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ProjectCreateResource",
  props: {
    actions: {},
    disabled: { type: Boolean },
    type: {}
  },
  emits: ["action"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const emit = __emit;
    const actionToggleRef = ref(null);
    __expose({
      openActionToggle: (isOpen) => actionToggleRef.value?.openActionToggle(isOpen)
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass([_ctx.$style.buttonGroup])
      }, [
        renderSlot(_ctx.$slots, "default"),
        createVNode(unref(N8nActionToggle), {
          ref_key: "actionToggleRef",
          ref: actionToggleRef,
          "data-test-id": "add-resource",
          actions: _ctx.actions,
          placement: "bottom-end",
          teleported: false,
          onAction: _cache[0] || (_cache[0] = ($event) => emit("action", $event))
        }, {
          default: withCtx(() => [
            createVNode(unref(_sfc_main$1), {
              disabled: _ctx.disabled,
              class: normalizeClass([_ctx.$style.buttonGroupDropdown]),
              icon: "angle-down",
              type: _ctx.type ?? "primary"
            }, null, 8, ["disabled", "class", "type"])
          ]),
          _: 1
        }, 8, ["actions"])
      ], 2);
    };
  }
});
const buttonGroup = "_buttonGroup_aulto_123";
const buttonGroupDropdown = "_buttonGroupDropdown_aulto_137";
const style0 = {
  buttonGroup,
  buttonGroupDropdown
};
const cssModules = {
  "$style": style0
};
const ProjectCreateResource = /* @__PURE__ */ _export_sfc(_sfc_main, [["__cssModules", cssModules]]);
export {
  ProjectCreateResource as P
};
