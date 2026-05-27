export const SSR_METRIC_PLACEHOLDER = "—";

/** Pick `value` after client mount; keep `placeholder` during SSR + hydration. */
export function pickAfterMount(
  mounted: boolean,
  value: string,
  placeholder = SSR_METRIC_PLACEHOLDER
) {
  return mounted ? value : placeholder;
}
