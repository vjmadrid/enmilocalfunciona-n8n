import { d as defineComponent, b as useRouter, a as useToast, ce as useSSOStore, r as ref, bu as reactive, c as openBlock, e as createBlock, g as useI18n, V as VIEWS } from "./index-DkwrpQEB.js";
import { A as AuthView } from "./AuthView-f4oecjPB.js";
import "./Logo-86l8l_Uc.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "SamlOnboarding",
  setup(__props) {
    const router = useRouter();
    const locale = useI18n();
    const toast = useToast();
    const ssoStore = useSSOStore();
    const loading = ref(false);
    const FORM_CONFIG = reactive({
      title: locale.baseText("auth.signup.setupYourAccount"),
      buttonText: locale.baseText("auth.signup.finishAccountSetup"),
      inputs: [
        {
          name: "firstName",
          initialValue: ssoStore.userData?.firstName,
          properties: {
            label: locale.baseText("auth.firstName"),
            maxlength: 32,
            required: true,
            autocomplete: "given-name",
            capitalize: true
          }
        },
        {
          name: "lastName",
          initialValue: ssoStore.userData?.lastName,
          properties: {
            label: locale.baseText("auth.lastName"),
            maxlength: 32,
            required: true,
            autocomplete: "family-name",
            capitalize: true
          }
        }
      ]
    });
    const isFormWithFirstAndLastName = (values) => {
      return "firstName" in values && "lastName" in values;
    };
    const onSubmit = async (values) => {
      if (!isFormWithFirstAndLastName(values)) return;
      try {
        loading.value = true;
        await ssoStore.updateUser(values);
        await router.push({ name: VIEWS.HOMEPAGE });
      } catch (error) {
        loading.value = false;
        toast.showError(error, "Error", error.message);
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(AuthView, {
        form: FORM_CONFIG,
        "form-loading": loading.value,
        onSubmit
      }, null, 8, ["form", "form-loading"]);
    };
  }
});
export {
  _sfc_main as default
};
