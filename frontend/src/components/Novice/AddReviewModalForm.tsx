import { View, Text, TextInput, Pressable } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { AirbnbRating } from "react-native-ratings";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
//internal imports
import styles from "../../../styles";
import { RatingFormValuesTypes, AddReviewModalFormProps } from "./types";
import noviceStyles from "./novice.styles";
import { ButtonComponent } from "..";

const reviewIntialValues: RatingFormValuesTypes = {
  content: "",
  rating: 3,
};

const validateReviewIntialValues = Yup.object().shape({
  content: Yup.string(),
  rating: Yup.number().required("Required"),
});

// MAIN COMPONENT
const AddReviewModalForm: React.FC<AddReviewModalFormProps> = ({ modalRef, handleRatingSubmit }) => {
  return (
    <Formik
      initialValues={reviewIntialValues}
      onSubmit={(values) => {
        modalRef.current?.close();
        handleRatingSubmit(values);
      }}
      validationSchema={validateReviewIntialValues}
    >
      {({ handleChange, handleBlur, handleSubmit, errors, touched, values }) => (
        <KeyboardAwareScrollView className="w-full">
          <View className="w-full items-center">
            <AirbnbRating
              defaultRating={values.rating}
              onFinishRating={(v) => (values.rating = v)}
              starContainerStyle={noviceStyles.starRowRating}
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

            <View className="mb-5">
              <ButtonComponent button_style="md" route_name="" title="SUBMIT" handlePress={() => handleSubmit()} disabled={false} />
            </View>
          </View>
        </KeyboardAwareScrollView>
      )}
    </Formik>
  );
};

export default AddReviewModalForm;
