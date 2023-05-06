import { useState } from "react";
import { Button } from "./Button";
import "../styles/components/validation-form.scss";
import { ValidationInput } from "./ValidationInput";
import { fullYears } from "../validation/yearsOld";

export const LoginValidation = () => {
	const [form, setForm] = useState({
		email: {
			value: "",
			error: "",
		},
		password: {
			value: "",
			error: "",
		},
		passwordRepeat: {
			value: "",
			error: "",
		},
		phone: {
			value: "",
			error: "",
		},
		dateBorn: {
			value: "",
			error: "",
		},
		// agreeCheck: {
		//   value: "",
		//   error: "",
		// },
	});

	const changeInput = (value: string, error: string, key: string) => {
		return setForm({
			...form,
			[key]: {
				...form[key as keyof typeof form],
				value: value,
				error: error,
			},
		});
	};

	const validationField = (
		field: string,
		fieldId: string,
		fieldName: string
	) => {
		return (
			<ValidationInput
				type={field}
				name={fieldId}
				error={form[fieldId as keyof typeof form].error}
				onInputChange={(newValue) => {
					changeInput(newValue, "", fieldId);
				}}>
				{fieldName}
			</ValidationInput>
		);
	};

	console.log(form);
	return (
		<form
			noValidate
			className="validation-form"
			onSubmit={(e) => {
				e.preventDefault();
				const email = form.email.value;
				const password = form.password.value;
				const passwordRepeat = form.passwordRepeat.value;
				const phone = form.phone.value;
				const dateBorn = new Date(form.dateBorn.value);
				const dateNow = new Date();

				let emailError = "";
				let passwordError = "";
				let passwordRepeatError = "";
				let phoneError = "";
				let dateBornError = "";
				
				const isValidEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
				const isValidPhone = /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(phone)
				const isAgeOld = fullYears(dateNow, dateBorn); 

				if (!isValidEmail) {
					emailError = "Email is not valid!"
				}

				if (password.length < 8) {
					passwordError = "Password must be at least 8 symbols"
				}

				if (password !== passwordRepeat) {
					passwordRepeatError = "Repeated password is not as password!"
				}

				if (!isValidPhone) {
					phoneError = "Phone number is not valid!"
				}

				if (isAgeOld < 18) {
					dateBornError = "Must be at least 18!"
				}

				if (dateNow < dateBorn) {
					dateBornError = "Sorry. This is not for time travelers!!"
				}

				if (dateBorn.toString() === "Invalid Date") {
					dateBornError = "Invalid Date";
				}


				if (!emailError && !passwordError && !passwordRepeatError && !phoneError && !dateBornError) {
					alert("All rright!")
				}

				setForm({
					...form,
					email: {
						value: email,
						error: emailError,
					},
					password: {
						value: password,
						error: passwordError,
					},
					passwordRepeat: {
						value: passwordRepeat,
						error: passwordRepeatError,
					},
					phone: {
						value: phone,
						error: phoneError,
					},
					dateBorn: {
						value: dateBorn.toString(),
						error: dateBornError,
					}
				})
	  

			}}>
			{validationField("email", "email", "Email")}
			{validationField("password", "password", "Password")}
			{validationField("password", "passwordRepeat", "Password repeat")}
			{validationField("tel", "phone", "Phone number")}
			{validationField("date", "dateBorn", "Birth date")}

			<Button type="submit">Save</Button>
		</form>
	);
};



// {/* <label htmlFor="agreeCheck">
//         <input
//           type="checkbox"
//           id="agreeCheck"
//           checked={!!form.agreeCheck.value}
//           onChange={(e) => {
//             const newValue = e.target.value;
//             changeInput(newValue, "", "agreeCheck");
//           }}
//         />
//           You agree with data?
//         {form.agreeCheck.error && <div>{form.agreeCheck.error}</div>}
//       </label> */}