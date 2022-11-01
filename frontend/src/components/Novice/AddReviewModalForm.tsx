import { View, Text, TextInput, Pressable } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { AirbnbRating } from "react-native-ratings";
//internal imports
import styles from "../../../styles";
import { RatingFormValuesTypes, AddReviewModalFormProps } from "./types";

const reviewIntialValues: RatingFormValuesTypes = {
  content: "",
  rating: 3,
};

const validateReviewIntialValues = Yup.object().shape({
  content: Yup.string(),
  rating: Yup.number().required("Required"),
});

// MAIN COMPONENT
const AddReviewModalForm: React.FC<AddReviewModalFormProps> = ({ modalRef }) => {
  return (
    <Formik
      initialValues={reviewIntialValues}
      onSubmit={(values, actions) => {
        console.log({ values, actions });
        alert(JSON.stringify(values, null, 2));
        modalRef.current?.close();
      }}
      validationSchema={validateReviewIntialValues}
    >
      {({ handleChange, handleBlur, handleSubmit, errors, touched, values }) => (
        <View className="w-full items-center">
          <AirbnbRating
            onFinishRating={(v) => (values.rating = v)}
            starContainerStyle={{ display: "flex", alignItems: "center", height: 30 }}
            size={20}
            reviews={["Terrible", "Bad", "Okay", "Good", "Great"]}
          />

          <TextInput
            onChangeText={handleChange("content")}
            onBlur={handleBlur("content")}
            value={values.content}
            className=" placeholder:pl-3 h-20 my-5 border-2 w-5/6 rounded-lg"
            placeholder="Clearify what "
            multiline={true}
            numberOfLines={10}
          />
          {errors.content && touched.content && <Text className="text-red-600">{errors.content}</Text>}

          <Pressable className="mt-2" style={styles.blue_button_sm} onPress={handleSubmit}>
            <Text className="text-sm text-white font-bold">SUBMIT</Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

export default AddReviewModalForm;
