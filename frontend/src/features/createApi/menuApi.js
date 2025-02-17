import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const menuApi = createApi({
  reducerPath: "menuApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8009/api/menu",
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Menu"],
  endpoints: (builder) => ({
    getMenuItems: builder.query({
      query: (searchParams) => ({
        url: "/search",
        method: "GET",
        params: searchParams,
      }),
      providesTags: ["Menu"],
    }),

    getMenuItemById: builder.query({
      query: (id) => `/details/${id}`,
      providesTags: ["Menu"],
    }),

    createMenuItem: builder.mutation({
      query: (menuData) => ({
        url: "/create",
        method: "POST",
        body: menuData,
      }),
      invalidatesTags: ["Menu"],
    }),

    updateMenuItem: builder.mutation({
      query: ({ id, menuData }) => ({
        url: `/update/${id}`,
        method: "PUT",
        body: menuData,
      }),
      invalidatesTags: ["Menu"],
    }),

    deleteMenuItem: builder.mutation({
      query: (id) => ({
        url: `/item/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Menu"],
    }),

    // New endpoints
    getAllMenuItemsForAdmin: builder.query({
      query: () => "/admin/all",
      providesTags: ["Menu"],
    }),

    getAllMenuItemsForUser: builder.query({
      query: ({ page = 1, limit = 8 }) => ({
        url: `/all?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["Menu"],
    }),
  }),
});

export const {
  useGetMenuItemsQuery,
  useGetMenuItemByIdQuery,
  useCreateMenuItemMutation,
  useUpdateMenuItemMutation,
  useDeleteMenuItemMutation,
  useGetAllMenuItemsForAdminQuery,
  useGetAllMenuItemsForUserQuery,
} = menuApi;
