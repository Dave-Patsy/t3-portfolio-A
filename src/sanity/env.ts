export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2024-06-29'

export const dataset = assertValue(
  //process.env.NEXT_PUBLIC_SANITY_DATASET,
  "production",
  "Missing environment variable: NEXT_PUBLIC_SANITY_DATASET",
);

export const projectId = assertValue(
  //process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  "j87h7574",
  "Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID",
);

export const useCdn = false

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}
