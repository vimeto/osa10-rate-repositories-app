import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useHistory } from "react-router-native";
import useCreateReview from '../hooks/useCreateReview';

import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  formParent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    /* backgroundColor: 'green', */
    paddingHorizontal: 15,
    paddingVertical: 7
  },
  formEntry: {
    width: '100%',
  },
  formEntryButton: {
    width: '100%',
    fontSize: 30,
    textAlign: 'center',
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: theme.colors.primary,
    fontWeight: '600',
    color: theme.colors.appBarText,
    borderRadius: 5,
  },
  formEntryButtonView: { 
    width: '100%', 
    borderRadius: 7, 
    overflow: 'hidden', 
    backgroundColor: 'yellow', 
    marginTop: 10
  }
});

const validationSchema = yup.object().shape({
  ownerName: yup.string().required('Repository owner name is required'),
  repositoryName: yup.string().required('Repository name is required'),
  rating: yup.number()
    .min(1, 'Weight must be greater or equal to 1')
    .max(100, 'Number must be less than 100')
    .required('Rating is required')
});

const CreateReviewForm = ({ onSubmit }) => {
  return (
    <View style={styles.formParent}>
      <FormikTextInput style={styles.formEntry} name="ownerName" placeholder="Repository owner name" />
      <FormikTextInput style={styles.formEntry} name="repositoryName" placeholder="Repository name" />
      <FormikTextInput style={styles.formEntry} name="rating" placeholder="Rating between 0 and 100" />
      <FormikTextInput style={styles.formEntry} name="text" placeholder="Open review" />
      <View style={styles.formEntryButtonView}>
        <Pressable onPress={onSubmit} testID='submitButton'>
          <Text style={styles.formEntryButton}>Login</Text>
        </Pressable>
      </View>
    </View>
  );
};

const CreateReview = ({ onSubmit }) => {

  return (
    <Formik initialValues={{ ownerName:"", repositoryName:"", rating:"", text:"" }} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit }) => <CreateReviewForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const CreateReviewContainer = () => {
  const history = useHistory();
  const [createReview] = useCreateReview();

  const onSubmit = async (values) => {
    try {
      const correctValues = {
        ...values,
        rating: Number(values.rating)
      };
      const repoId = await createReview(correctValues);
      console.log(repoId.createReview.repositoryId);
      history.push(`/singleRepo/${repoId.createReview.repositoryId}`);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <CreateReview onSubmit={onSubmit} />
  );
};

export default CreateReviewContainer;