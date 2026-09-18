const enabled = import.meta.env.PUBLIC_ANALYTICS_ENABLED === 'true';
const measurementId = import.meta.env.PUBLIC_GA_MEASUREMENT_ID?.trim() ?? '';
if (enabled && !/^G-[A-Z0-9]+$/.test(measurementId)) {
  throw new Error(
    'Analytics enabled without a valid PUBLIC_GA_MEASUREMENT_ID (G-...).',
  );
}
export const analytics = { enabled, measurementId };
