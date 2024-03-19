import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/outline";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
const NewDemo = ({
  postTopic,
  setPostTopic,
  // handleHelpTopicSubmit,
  handleTopicUpdateSubmit,
  setShowPostModal,
  modelName,
  helpTopics,
}) => {
  const [open, setOpen] = useState(true);
  const cancelButtonRef = useRef(null);
  const properties = Object.keys(helpTopics[0] || {}).filter(
    (property) => property !== "id" && property !== "slug"
  );

  const validationSchema = Yup.object().shape(
    properties.reduce((schema, property) => {
      schema[property] = Yup.string().required(
        `${property.replace(/_/g, " ").toUpperCase()} is required`
      );
      return schema;
    }, {})
  );
  // const initialValues = .reduce((values, field) => {
  //   values[field.name] = field.initialValue || "";
  //   return values;
  // }, {});

  const handleSubmit = async () => {
    try {
      await validationSchema.validate(postTopic, { abortEarly: false });
      if (postTopic.slug) {
        handleTopicUpdateSubmit();
      }
      // else {
      //   handleHelpTopicSubmit();
      // }
      setOpen(false);
    } catch (error) {
      // Handle validation errors
      console.error("Validation Error:", error);
    }
  };
  return (
    <Transition.Root show={open} as={Fragment}>
      {/* <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      > */}
      {/* {({ handleSubmit }) => <Form onSubmit={handleSubmit}></Form>} */}
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
                    <div className="mt-2  ">
                      {properties.map(
                        (property) =>
                          property !== "id" && (
                            <div key={property} className="mt-2 sm:col-span-4">
                              <label
                                htmlFor={property}
                                className="block mt-3 text-sm font-medium leading-6 text-gray-900"
                              >
                                {property.replace(/_/g, " ").toUpperCase()}
                              </label>
                              <input
                                required
                                type="text"
                                placeholder={`Please Enter ${property
                                  .replace(/_/g, " ")
                                  .toUpperCase()}`}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                value={postTopic[property]}
                                onChange={(e) => {
                                  setPostTopic({
                                    ...postTopic,
                                    [property]: e.target.value,
                                  });
                                }}
                              />
                            </div>
                          )
                      )}
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                    onClick={() => {
                      handleSubmit();
                      setOpen(false);
                    }}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                    onClick={() => {
                      setPostTopic({
                        help_topic: "",
                        status: "",
                        autoresponse: "",
                        inventory_type: "",
                        department: "",
                        priority: "",
                      });
                      setShowPostModal(false);
                      setOpen(false);
                    }}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
      {/* </Formik> */}
    </Transition.Root>
  );
};

export default NewDemo;
