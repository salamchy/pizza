import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const reservationApi = createApi({
  reducerPath: "reservationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8009/api/reservation",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createReservation: builder.mutation({
      query: (data) => ({
        url: "/create-reservation",
        method: "POST",
        body: data,
      }),
    }),
    getUserReservation: builder.query({
      query: () => "/user-reservation",
    }),
    getAllReservations: builder.query({
      query: () => "/all-reservations",
    }),
    updateReservation: builder.mutation({
      query: ({ id, status }) => ({
        url: `/update-reservation/${id}`,
        method: "PUT",
        body: { status },
      }),
    }),
  }),
});

export const {
  useCreateReservationMutation,
  useGetUserReservationQuery,
  useGetAllReservationsQuery,
  useUpdateReservationMutation,
} = reservationApi;
