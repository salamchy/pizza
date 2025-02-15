import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const carouselApi = createApi({
  reducerPath: "carouselApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8009/api/carousels",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getCarouselImages: builder.query({
      query: () => "/get-image",
    }),
    addCarouselImage: builder.mutation({
      query: (newImage) => ({
        url: "/upload-image",
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

export const {
  useGetCarouselImagesQuery,
  useAddCarouselImageMutation,
  useDeleteCarouselImageMutation,
} = carouselApi;
