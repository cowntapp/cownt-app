import z from 'zod';

const emailConfig = {
  min: 1,
  max: 255,
};
const passwordConfig = {
  min: 6,
  max: 255,
};
export const emailSchema = z
  .string()
  .email('Email incorrecte')
  .min(emailConfig.min, `Email ha de tenir ${emailConfig.min} caràcter mínim`)
  .max(
    emailConfig.max,
    `Email pot contenir un màxim de ${emailConfig.max} caràcters`
  );
export const passwordSchema = z
  .string()
  .min(
    passwordConfig.min,
    `Contrasenya ha de tenir ${passwordConfig.min} caràcters mínim`
  )
  .max(
    passwordConfig.max,
    `Contrasenya pot contenir un màxim de ${passwordConfig.max} caràcters`
  );
