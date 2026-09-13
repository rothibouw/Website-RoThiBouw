/***************************  VALIDATION SCHEMAS  ***************************/

export const getEmailSchema = (t) => ({
  required: t('forms.validation.emailRequired'),
  pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: t('forms.validation.emailInvalid') }
});

export const getFirstNameSchema = (t) => ({
  required: t('forms.validation.firstNameRequired'),
  pattern: { value: /^[a-zA-Z\s]+$/, message: t('forms.validation.firstNameInvalid') }
});

export const getLastNameSchema = (t) => ({
  required: t('forms.validation.lastNameRequired'),
  pattern: { value: /^[a-zA-Z\s]+$/, message: t('forms.validation.lastNameInvalid') }
});

export const getPhoneSchema = (t) => ({
  required: t('forms.validation.phoneRequired'),
  pattern: { value: /^[0-9()-.\s]{7,15}$/, message: t('forms.validation.phoneInvalid') }
});

export const getMessageSchema = (t) => ({
  required: t('forms.validation.messageRequired')
});

export const getLocationSchema = (t) => ({
  required: t('forms.validation.locationRequired')
});
