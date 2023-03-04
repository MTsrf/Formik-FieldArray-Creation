import { Form, Field, FieldArray, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  employess: Yup.array().of(
    Yup.object().shape({
      firstname: Yup.string().required("This field is required")
    })
  )
});
const FormikCreation = () => {
  return (
    <>
      <Formik
        initialValues={{
          employess: [{ firstname: "Sharafu" }]
        }}
        enableReinitialize={true}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {(formik) => (
          <Form>
            <div>
              <h4>Employess</h4>
              <FieldArray
                name="employess"
                render={(arrayHelpers) => {
                  return (
                    <div>
                      {formik.values.employess.map((item, index) => (
                        <>
                          <div key={index}>
                            {index > 0 && (
                              <div>
                                <button
                                  onClick={() => arrayHelpers.remove(index)}
                                >
                                  -Remove
                                </button>
                              </div>
                            )}
                            <div className="card" style={{ padding: "5px" }}>
                              <div className="card-title">{`emplyees${
                                index + 1
                              }`}</div>
                              <div className="card-body">
                                <div className="form-group">
                                  <label htmlFor={`index.${index}.firstname`}>
                                    Firstname
                                  </label>
                                  <Field
                                    type="text"
                                    value={item.firstname}
                                    className="form-control"
                                    name={`employess.${index}.firstname`}
                                  />
                                  <ErrorMessage
                                    name={`employess.${index}.firstname`}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      ))}
                      <div>
                        <button
                          onClick={() =>
                            arrayHelpers.insert(
                              formik.values.employess.length + 1,
                              { firstname: "" }
                            )
                          }
                        >
                          +ADD
                        </button>
                      </div>
                    </div>
                  );
                }}
              />
            </div>
            <div>
              <button type="submit">Submit</button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};
export default FormikCreation;
