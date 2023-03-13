import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import {
  getContent,
  RenderContent,
  getBuilderSearchParams,
} from "@builder.io/sdk-qwik";

export const BUILDER_PUBLIC_API_KEY = "fe07520489dd4741b861fe3c2e19b071"; // <-- Add your Public API KEY here
export const BUILDER_MODEL = "page";

export const useBuilderContent = routeLoader$(async ({ url, error }) => {
  const builderContent = await getContent({
    model: BUILDER_MODEL,
    apiKey: BUILDER_PUBLIC_API_KEY,
    options: getBuilderSearchParams(url.searchParams),
    userAttributes: {
      urlPath: url.pathname,
    },
  });

  if (!builderContent) {
    throw error(404, "Not Found");
  }

  return builderContent;
});

export default component$(() => {
  const content = useBuilderContent();

  return (
    <RenderContent
      model={BUILDER_MODEL}
      content={content.value}
      apiKey={BUILDER_PUBLIC_API_KEY}
    />
  );
});
