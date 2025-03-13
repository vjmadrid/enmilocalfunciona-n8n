const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/RunDataJsonActions-B7Oc2vSo.js","assets/index-DkwrpQEB.js","assets/index-DvUG3hgI.css","assets/_commonjs-dynamic-modules-TGKdzP3c.js","assets/usePinnedData-cAEPUGIg.js","assets/RunDataJsonActions-DrgwFS0W.css"])))=>i.map(i=>d[i]);
import { d as defineComponent, as as useNDVStore, r as ref, i1 as nonExistingJsonPath, i2 as useElementSize, q as computed, hh as executionDataToJson, c as openBlock, h as createElementBlock, e as createBlock, w as withCtx, l as unref, f as createCommentVNode, bE as Suspense, i as createVNode, hY as MappingPill, hZ as TextWithHighlights, n as normalizeClass, h9 as Draggable, bG as defineAsyncComponent, ar as __vitePreload, x as shorten, i0 as getMappedExpression, i3 as isString, aU as useExternalHooks, ak as useTelemetry, _ as _export_sfc } from "./index-DkwrpQEB.js";
import { V as VueJsonPretty } from "./NodeDetailsView-CGPkwklD.js";
import "./usePinnedData-cAEPUGIg.js";
import "./useRunWorkflow-Cr62-QBr.js";
import "./pushConnection.store-DAf-xv0B.js";
import "./import-curl-Bm8BI4Ms.js";
import "./FileSaver.min-pwLVwMq4.js";
import "./RunDataAi-3mvlRRpH.js";
import "./useExecutionHelpers-DTlfzIbO.js";
import "./useWorkflowActivate-COcGS4jx.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "RunDataJson",
  props: {
    editMode: { default: () => ({}) },
    pushRef: {},
    paneType: {},
    node: {},
    inputData: {},
    mappingEnabled: { type: Boolean },
    distanceFromActive: {},
    runIndex: {},
    totalRuns: {},
    search: {}
  },
  setup(__props) {
    const LazyRunDataJsonActions = defineAsyncComponent(
      async () => await __vitePreload(() => import("./RunDataJsonActions-B7Oc2vSo.js"), true ? __vite__mapDeps([0,1,2,3,4,5]) : void 0)
    );
    const props = __props;
    const ndvStore = useNDVStore();
    const externalHooks = useExternalHooks();
    const telemetry = useTelemetry();
    const selectedJsonPath = ref(nonExistingJsonPath);
    const draggingPath = ref(null);
    const displayMode = ref("json");
    const jsonDataContainer = ref(null);
    const { height } = useElementSize(jsonDataContainer);
    const jsonData = computed(() => executionDataToJson(props.inputData));
    const highlight2 = computed(() => ndvStore.highlightDraggables);
    const getShortKey = (el) => {
      if (!el) {
        return "";
      }
      return shorten(el.dataset.name ?? "", 16, 2);
    };
    const getJsonParameterPath = (path) => {
      const subPath = path.replace(/^(\["?\d"?])/, "");
      return getMappedExpression({
        nodeName: props.node.name,
        distanceFromActive: props.distanceFromActive,
        path: subPath
      });
    };
    const onDragStart = (el) => {
      if (el?.dataset.path) {
        draggingPath.value = el.dataset.path;
      }
      ndvStore.resetMappingTelemetry();
    };
    const onDragEnd = (el) => {
      draggingPath.value = null;
      const mappingTelemetry = ndvStore.mappingTelemetry;
      const telemetryPayload = {
        src_node_type: props.node.type,
        src_field_name: el.dataset.name ?? "",
        src_nodes_back: props.distanceFromActive,
        src_run_index: props.runIndex,
        src_runs_total: props.totalRuns,
        src_field_nest_level: el.dataset.depth ?? 0,
        src_view: "json",
        src_element: el,
        success: false,
        ...mappingTelemetry
      };
      setTimeout(() => {
        void externalHooks.run("runDataJson.onDragEnd", telemetryPayload);
        telemetry.track("User dragged data for mapping", telemetryPayload, {
          withPostHog: true
        });
      }, 1e3);
    };
    const getContent = (value) => {
      return isString(value) ? `"${value}"` : JSON.stringify(value);
    };
    const getListItemName = (path) => {
      return path.replace(/^(\["?\d"?]\.?)/g, "");
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        ref_key: "jsonDataContainer",
        ref: jsonDataContainer,
        class: normalizeClass([_ctx.$style.jsonDisplay, { [_ctx.$style.highlight]: highlight2.value }])
      }, [
        (openBlock(), createBlock(Suspense, null, {
          default: withCtx(() => [
            !_ctx.editMode.enabled ? (openBlock(), createBlock(unref(LazyRunDataJsonActions), {
              key: 0,
              node: _ctx.node,
              "push-ref": _ctx.pushRef,
              "display-mode": displayMode.value,
              "distance-from-active": _ctx.distanceFromActive,
              "selected-json-path": selectedJsonPath.value,
              "json-data": jsonData.value,
              "pane-type": _ctx.paneType
            }, null, 8, ["node", "push-ref", "display-mode", "distance-from-active", "selected-json-path", "json-data", "pane-type"])) : createCommentVNode("", true)
          ]),
          _: 1
        })),
        createVNode(Draggable, {
          type: "mapping",
          "target-data-key": "mappable",
          disabled: !_ctx.mappingEnabled,
          onDragstart: onDragStart,
          onDragend: onDragEnd
        }, {
          preview: withCtx(({ canDrop, el }) => [
            el ? (openBlock(), createBlock(MappingPill, {
              key: 0,
              html: getShortKey(el),
              "can-drop": canDrop
            }, null, 8, ["html", "can-drop"])) : createCommentVNode("", true)
          ]),
          default: withCtx(() => [
            createVNode(unref(VueJsonPretty), {
              data: jsonData.value,
              deep: 10,
              "show-length": true,
              "selected-value": selectedJsonPath.value,
              "root-path": "",
              "selectable-type": "single",
              class: "json-data",
              virtual: true,
              height: unref(height),
              "onUpdate:selectedValue": _cache[0] || (_cache[0] = ($event) => selectedJsonPath.value = $event)
            }, {
              renderNodeKey: withCtx(({ node }) => [
                createVNode(TextWithHighlights, {
                  content: getContent(node.key),
                  search: _ctx.search,
                  "data-target": "mappable",
                  "data-value": getJsonParameterPath(node.path),
                  "data-name": node.key,
                  "data-path": node.path,
                  "data-depth": node.level,
                  class: normalizeClass({
                    [_ctx.$style.mappable]: _ctx.mappingEnabled,
                    [_ctx.$style.dragged]: draggingPath.value === node.path
                  })
                }, null, 8, ["content", "search", "data-value", "data-name", "data-path", "data-depth", "class"])
              ]),
              renderNodeValue: withCtx(({ node }) => [
                isNaN(node.index) ? (openBlock(), createBlock(TextWithHighlights, {
                  key: 0,
                  content: getContent(node.content),
                  search: _ctx.search
                }, null, 8, ["content", "search"])) : (openBlock(), createBlock(TextWithHighlights, {
                  key: 1,
                  content: getContent(node.content),
                  search: _ctx.search,
                  "data-target": "mappable",
                  "data-value": getJsonParameterPath(node.path),
                  "data-name": getListItemName(node.path),
                  "data-path": node.path,
                  "data-depth": node.level,
                  class: normalizeClass([{
                    [_ctx.$style.mappable]: _ctx.mappingEnabled,
                    [_ctx.$style.dragged]: draggingPath.value === node.path
                  }, "ph-no-capture"])
                }, null, 8, ["content", "search", "data-value", "data-name", "data-path", "data-depth", "class"]))
              ]),
              _: 1
            }, 8, ["data", "selected-value", "height"])
          ]),
          _: 1
        }, 8, ["disabled"])
      ], 2);
    };
  }
});
const jsonDisplay = "_jsonDisplay_1lb1c_123";
const mappable = "_mappable_1lb1c_140";
const highlight = "_highlight_1lb1c_146";
const dragged = "_dragged_1lb1c_147";
const style0 = {
  jsonDisplay,
  mappable,
  highlight,
  dragged
};
const cssModules = {
  "$style": style0
};
const RunDataJson = /* @__PURE__ */ _export_sfc(_sfc_main, [["__cssModules", cssModules]]);
export {
  RunDataJson as default
};
