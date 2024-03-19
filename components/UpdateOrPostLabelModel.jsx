import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/outline";

import { Formik, Form, Field, ErrorMessage } from "formik";

const UpdateOrPostLabelModel = ({
  postLabel,
  setPostLabel,
  modelName,
  setShowPostModal,
  lableData,
  validationSchema,
  handleUpdateSubmit,
  handleLabelSubmit,
}) => {
  const [open, setOpen] = useState(true);

  const cancelButtonRef = useRef(null);

  console.log("This is postLabel->", postLabel);
  const handleHelpTopic = async (values) => {
    try {
      console.log("handleHelpTopic.postLabel", postLabel.slug);
      if (postLabel.slug) {
        handleUpdateSubmit(values);

        console.log("topic updated from here");
      } else {
        handleLabelSubmit(values);
        console.log("Label Posting from here", values);
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
                        initialValues={postLabel}
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
                                New {modelName}
                              </h2>
                              <p className="mt-1 text-sm leading-6 text-gray-600 border-b-2 pb-1"></p>

                              <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
                                <div className="sm:col-span-6">
                                  <label
                                    htmlFor="name"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                  >
                                    {modelName} Name:
                                    <span className="text-red-600 text-xl align-content-center ">
                                      *
                                    </span>
                                  </label>
                                  <Field
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder={`Write ${modelName}`}
                                    autoComplete="given-name"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    value={values.name}
                                    onChange={handleChange}
                                  />
                                  <ErrorMessage
                                    name="name"
                                    component="div"
                                    className="text-red-600"
                                  />
                                </div>

                                <div className="sm:col-span-6">
                                  <label
                                    htmlFor="name"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                  >
                                    {modelName} Visiblity:
                                    <span className="text-red-600 text-xl align-content-center ">
                                      *
                                    </span>
                                  </label>
                                  <Field
                                    type="text"
                                    id="is_visible"
                                    name="is_visible"
                                    placeholder="Write Visiblity"
                                    autoComplete="given-name"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    value={values.is_visible}
                                    onChange={handleChange}
                                  />
                                  <ErrorMessage
                                    name="is_visible"
                                    component="div"
                                    className="text-red-600"
                                  />
                                </div>

                                {/* <div className="space-y-3 pt-2 sm:col-span-6">
                                  <legend className="text-sm font-semibold leading-2 text-gray-900">
                                    Visiblity:
                                    <span className="text-red-600 text-xl align-content-center ">
                                      *
                                    </span>
                                  </legend>
                                  <div className="">
                                    <div className="flex items-center gap-x-3">
                                      <Field
                                        id="1"
                                        name="is_visible"
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
                                        id="1"
                                        name="is_visible"
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
                                </div> */}
                              </div>
                            </div>

                            <div className=" flex justify-end gap-x-2 mt-4 sm:col-span-6">
                              <button
                                type="submit"
                                className="rounded-md bg-gray-900 hover:bg-gray-800 px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                onClick={() => {
                                  handleHelpTopic();
                                }}
                              >
                                Submit
                              </button>

                              <button
                                type="button"
                                className="rounded-md bg-[#DD0426] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#dd0425d3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                                onClick={() => {
                                  setPostLabel({
                                    ...lableData,
                                    name: "",
                                    is_visible: "",
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

export default UpdateOrPostLabelModel;
