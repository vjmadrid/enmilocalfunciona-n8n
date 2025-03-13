import { u as useTestDefinitionForm } from "./useTestDefinitionForm-wWVotwCR.js";
import { d as defineComponent, bX as useTestDefinitionStore, fH as useAnnotationTagsStore, a as useToast, b as useRouter, $ as useRootStore, V as VIEWS, c as openBlock, h as createElementBlock, t as toDisplayString, ak as useTelemetry } from "./index-DkwrpQEB.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "TestDefinitionNewView",
  props: {
    name: {}
  },
  setup(__props) {
    const props = __props;
    const { state, createTest, updateTest } = useTestDefinitionForm();
    const testDefinitionStore = useTestDefinitionStore();
    const tagsStore = useAnnotationTagsStore();
    const toast = useToast();
    const telemetry = useTelemetry();
    const router = useRouter();
    function generateTagFromName(name) {
      let tag = name.toLowerCase().replace(/\s+/g, "_");
      if (tag.length > 18) {
        const start = tag.slice(0, 10);
        const end = tag.slice(-8);
        tag = `${start}..${end}`;
      }
      return tag;
    }
    async function createTag(tagName) {
      try {
        const newTag = await tagsStore.create(tagName, { incrementExisting: true });
        return newTag;
      } catch (error) {
        toast.showError(error, "Error", error.message);
        throw error;
      }
    }
    void createTest(props.name).then(async (test) => {
      if (!test) {
        throw new Error("no test found");
      }
      const tag = generateTagFromName(state.value.name.value);
      const testTag = await createTag(tag);
      state.value.tags.value = [testTag.id];
      await updateTest(test.id);
      testDefinitionStore.updateRunFieldIssues(test.id);
      telemetry.track(
        "User created test",
        {
          test_id: test.id,
          workflow_id: props.name,
          session_id: useRootStore().pushRef
        },
        {
          withPostHog: true
        }
      );
      await router.replace({
        name: VIEWS.TEST_DEFINITION_EDIT,
        params: { testId: test.id }
      });
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", null, "creating " + toDisplayString(_ctx.name), 1);
    };
  }
});
export {
  _sfc_main as default
};
