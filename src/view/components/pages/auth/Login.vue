<script setup lang="ts">
import { EnvelopeIcon, LockOpenIcon } from "@heroicons/vue/24/outline";
import { reactive, ref } from "vue";
import { auth } from "./useAuth";
import { useCookies } from "vue3-cookies";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";

// cookie削除
const { cookies } = useCookies();
cookies.remove("token");

// 入力情報
const inputData = reactive({
  email: "",
  password: "",
});
type inputDataType = typeof inputData;

// 入力情報のバリデーション
const v$ = useVuelidate(
  {
    email: { required },
    password: { required },
  },
  inputData
);

const execAuth = async (inputData: inputDataType) => {
  const hasNoValidationError = await v$.value.$validate();
  if (hasNoValidationError) {
    auth(inputData.email, inputData.password);
  }
};
</script>

<template>
  <div class="p-8 mx-auto lg:w-1/2 max-w-2xl">
    <div class="bg-gray-100 rounded-b-lg py-12 px-4">
      <p class="text-center">LOGIN TO YOUR ACCOUNT</p>
      <div class="flex flex-col p-4">
        <!-- input -->
        <div>
          <div class="relative">
            <input
              v-model="inputData.email"
              class="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600 transition rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
              type="text"
              placeholder="Email"
            />
            <EnvelopeIcon
              class="absolute top-1/2 left-1 -translate-y-1/2 w-8 text-gray-400 p-1"
            ></EnvelopeIcon>
          </div>
          <div class="text-red-500 tracking-wide h-6 px-3 text-sm">
            <p v-for="error of v$.email.$errors" :key="error.$uid">
              {{ error.$message }}
            </p>
          </div>
        </div>
        <div>
          <div class="relative">
            <input
              v-model="inputData.password"
              class="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600 transition rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
              type="text"
              placeholder="Password"
            />
            <LockOpenIcon
              class="absolute top-1/2 left-1 -translate-y-1/2 w-8 text-gray-400 p-1"
            ></LockOpenIcon>
          </div>
          <div class="text-red-500 tracking-wide h-6 px-3 text-sm">
            <p v-for="error of v$.password.$errors" :key="error.$uid">
              {{ error.$message }}
            </p>
          </div>
        </div>

        <!-- button -->
        <div class="flex items-center justify-center">
          <button
            @click="execAuth(inputData)"
            class="py-2 px-4 bg-teal-400 border active:bg-teal-800 text-base text-white rounded-lg hover:bg-teal-600"
          >
            SIGN IN
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
