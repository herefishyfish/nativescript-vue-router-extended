import { getCurrentInstance, h } from "vue";

const RouterView = {
  props: {
    id: {
      type: String,
      default: "default",
    },
    defaultRoute: {
      type: String,
      default: "/",
    },
    defaultRouteProps: {
      type: Object,
      required: false,
    },
  },
  setup(props) {
    const globalProperties =
      getCurrentInstance()?.appContext?.config?.globalProperties;
    const initialRoute =
      globalProperties.$router.getCurrentRoute() ||
      globalProperties.$router.getRoute(props.defaultRoute);
    if (!initialRoute) {
      throw new Error(
        `No registered route at path "${props.defaultRoute}" found on current router`
      );
    }
    globalProperties.$router.setCurrentRoute(initialRoute);
    return () => {
      return h(
        "Frame",
        {
          id: props.id,
        },
        [h(initialRoute.component, { props: props.defaultRouteProps })]
      );
    };
  },
};

export default RouterView;
