import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/outline";

import { Formik, Form, Field, ErrorMessage } from "formik";
const UpdateOrPostTopicModel = ({
  postTopic,
  setPostTopic,
  setShowPostModal,
  modelName,
  helpTopics,
  validationSchema,
  handleTopicUpdateSubmit,
  handleHelpTopicSubmit,
}) => {
  const [open, setOpen] = useState(true);

  const cancelButtonRef = useRef(null);

  console.log("This is postTopic->", postTopic);
  const handleHelpTopic = async (values) => {
    try {
      console.log("handleHelpTopic.postTopic", postTopic.slug);
      if (postTopic.slug) {
        handleTopicUpdateSubmit(values);

        console.log("topic updated from here");
      } else {
        handleHelpTopicSubmit(values);
        console.log("topic Posting from here", values);
      }
    } catch (error) {
      console.error("Error submitting data:", error.message);
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={() => setOpen(open)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <CheckIcon
                      className="h-6 w-6 text-green-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3  sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-center text-gray-900"
                    >
                      {modelName}
                    </Dialog.Title>
                    <div className="space-y-4 sm:px-3">
                      <Formik
                        initialValues={postTopic}
                        validationSchema={validationSchema}
                        onSubmit={handleHelpTopic}
                      >
                        {({
                          handleSubmit,
                          handleChange,
                          handleBlur,
                          values,
                        }) => (
                          <Form onSubmit={handleSubmit}>
                            <div className="border-b border-gray-900/10 pb-2 ">
                              <h2 className="text-base font-semibold leading-6 text-gray-900">
                                New Help Topic
                              </h2>
                              <p className="mt-1 text-sm leading-6 text-gray-600 border-b-2 pb-1">
                                Disabling auto response will overwrite dept
                                settings.
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
                                    value={values.name}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
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
                                    value={values.auth_code}
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
                                    value={values.priority}
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
                                    value={values.dept_id}
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
                                          // value={(values.status = 1)}
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
                                          // value={(values.status = 0)}
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
                                            // value={values.autoresp}
                                            // onchange={handleChange}
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
                                onClick={() => {
                                  handleHelpTopic();
                                }}
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
                                className="rounded-md bg-[#DD0426] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#dd0425d3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                                onClick={() => {
                                  setPostTopic({
                                    ...helpTopics,
                                    name: "",
                                    auth_code: "",
                                    dept_id: "",
                                    priority: "",
                                    status: "",
                                    autoresp: "",
                                  });
                                  setShowPostModal(false);
                                  setOpen(false);
                                }}
                                ref={cancelButtonRef}
                              >
                                Cancel
                              </button>
                            </div>
                          </Form>
                        )}
                      </Formik>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default UpdateOrPostTopicModel;
