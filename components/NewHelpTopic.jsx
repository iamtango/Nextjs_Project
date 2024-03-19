"use client";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Help_Topic_URL } from "@/config/constant";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function NewHelpTopic() {
  const [formValues, setFormValues] = useState({
    name: "",
    auth_code: "",
    dept_id: "",
    status: "",
  });

  const router = useRouter();
  console.log("form", formValues);

  const validationSchema = Yup.object({
    name: Yup.string().required("Help Topic is required"),
    auth_code: Yup.string().required("Auth Code is required"),
    priority: Yup.string().required("Ticket Priority is required"),
    dept_id: Yup.string().required("Department is required"),
    status: Yup.string().required("Status is required"),
    auto_response: Yup.string(),
  });

  const { data: session } = useSession();
  console.log("data session", session);

  const handleSubmitTopic = async (values, { resetForm }) => {
    try {
      // const response = await fetch(Help_Topic_URL, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${session?.user?.token}`,
      //   },
      //   body: JSON.stringify({
      //     ...values,
      //     // name: values.name,
      //     // auth_code: values.auth_code,
      //     // dept_id: values.dept_id,
      //     // status: values.status,
      //   }),
      // });
      // console.log("values", values);
      // if (!response.ok) {
      //   console.log("Failed to submit data");
      // } else {
      //   toast.success("Data submitted successfully");
      //   console.log("Data submitted successfully");
      //   resetForm();
      //   setFormValues({
      //     name: "",
      //     auth_code: "",
      //     dept_id: "",
      //     status: "",
      //   });
      router.push("/help-topics");
      // }
    } catch (error) {
      console.error("Error submitting data:", error.message);
    }
  };

  return (
    <div className="space-y-4 sm:px-3">
      <ToastContainer />
      <Formik
        initialValues={formValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmitTopic}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <div className="border-b border-gray-900/10 pb-2 ">
              <h2 className="text-base font-semibold leading-6 text-gray-900">
                New Help Topic
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600 border-b-2 pb-1">
                Disabling auto response will overwrite dept settings.
              </p>

              <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Help Topic:
                    <span className="text-red-600 text-xl align-content-center ">
                      *
                    </span>
                  </label>
                  <Field
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Write Help Topic"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-600"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="auth_code"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Auth Code:
                  </label>
                  <Field
                    type="text"
                    id="auth_code"
                    name="auth_code"
                    placeholder="Write Auth code"
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <ErrorMessage
                    name="auth_code"
                    component="div"
                    className="text-red-600"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="priority"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    New Ticket Priority:
                    <span className="text-red-600 text-xl align-content-center ">
                      *
                    </span>
                  </label>
                  <Field
                    as="select"
                    id="priority"
                    name="priority"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option value="">Select Priority</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </Field>
                  <ErrorMessage
                    name="priority"
                    component="div"
                    className="text-red-600"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="dept_id"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    New Ticket Department:
                    <span className="text-red-600 text-xl align-content-center ">
                      *
                    </span>
                  </label>
                  <Field
                    as="select"
                    id="dept_id"
                    name="dept_id"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option value="">Select Department</option>
                    <option value="1">Department 1</option>
                    <option value="2">Department 2</option>
                    <option value="3">Department 3</option>
                  </Field>
                  <ErrorMessage
                    name="dept_id"
                    component="div"
                    className="text-red-600"
                  />
                </div>

                <div className="space-y-3 sm:col-span-3">
                  <div>
                    <legend className="text-sm font-semibold leading-6 text-gray-900">
                      Topic Status:
                    </legend>
                    <div className="">
                      <div className="flex items-center gap-x-3">
                        <Field
                          id="active"
                          name="status"
                          type="radio"
                          value="1"
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <label
                          htmlFor="active"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Active
                        </label>
                      </div>
                      <div className="flex items-center gap-x-3">
                        <Field
                          id="disable"
                          name="status"
                          type="radio"
                          value="0"
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <label
                          htmlFor="disable"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Disabled
                        </label>
                      </div>
                    </div>
                    <ErrorMessage
                      name="status"
                      component="div"
                      className="text-red-600"
                    />
                  </div>

                  <div>
                    <legend className="text-sm font-semibold  text-gray-900">
                      Auto Response:
                    </legend>
                    <div className=" space-y-6">
                      <div className="relative flex gap-x-3">
                        <div className="flex h-6 items-center">
                          <Field
                            id="auto_response"
                            name="auto_response"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                        </div>
                        <div className="text-sm">
                          <label className="font-medium text-gray-900">
                            Disable{" "}
                            <div className="text-gray-500 text-xs">
                              autoresponse for this topic.{" "}
                              <span className="italic ">
                                (Overwrite Dept setting)
                              </span>
                            </div>
                          </label>
                        </div>
                      </div>
                      <ErrorMessage
                        name="auto_response"
                        component="div"
                        className="text-red-600"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className=" flex justify-end gap-x-2 mt-4 sm:col-span-6">
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Submit
              </button>
              <button
                type="reset"
                className="rounded-md bg-gray-900 hover:bg-gray-800 px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Reset
              </button>
              <button
                type="button"
                className="rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
              >
                Cancel
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
