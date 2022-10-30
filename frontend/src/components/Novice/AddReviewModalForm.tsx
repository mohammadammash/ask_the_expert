import { View, Text, TextInput, Pressable } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
//internal imports
import styles from "../../../styles";
interface formValues {
  content: string;
}
export const reviewIntialValues: formValues = {
  content: "",
};

export const validateReviewIntialValues = Yup.object().shape({
  content: Yup.string(),
});

const AddReviewModalForm = () => {
  return (
      <Formik
        initialValues={{ about: "" }}
        onSubmit={(values, actions) => {
          console.log({ values, actions });
          alert(JSON.stringify(values, null, 2));
        }}
        validationSchema={validateReviewIntialValues}
      >
        {({ handleChange, handleBlur, handleSubmit, errors, touched, values }) => (
          <View className="w-full h-3/4 items-center justify-around">
            <Text className="font-bold">About</Text>
            <TextInput
              onChangeText={handleChange("about")}
              onBlur={handleBlur("about")}
              value={values.about}
              className=" placeholder:pl-3 h-20 border-2 w-5/6 rounded-lg"
              placeholder="Talk About Your Career/Experience"
              multiline={true}
              numberOfLines={10}
            />
            {errors.about && touched.about && <Text className="text-red-600">{errors.about}</Text>}

            <Pressable className="mt-2" style={styles.blue_button_sm} onPress={handleSubmit}>
              <Text className="text-sm text-white font-bold">SUBMIT</Text>
            </Pressable>
          </View>
        )}
      </Formik>
  );
};

export default AddReviewModalForm;
