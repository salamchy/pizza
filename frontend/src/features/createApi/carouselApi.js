import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const carouselApi = createApi({
  reducerPath: "carouselApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8009",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getCarouselImages: builder.query({
      query: () => "/carousel",
    }),
    addCarouselImage: builder.mutation({
      query: (newImage) => ({
        url: "/carousel",
        method: "POST",
        body: newImage,
      }),
    }),
    deleteCarouselImage: builder.mutation({
      query: (id) => ({
        url: `/carousel/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetCarouselImagesQuery,
  useAddCarouselImageMutation,
  useDeleteCarouselImageMutation,
} = carouselApi;

export default carouselApi.reducer;
