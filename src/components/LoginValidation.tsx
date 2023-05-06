import React, { useEffect, useRef, useState } from "react";
import { Button } from "./Button";
import "../styles/components/validation-form.scss";
import { ValidationInput } from "./ValidationInput";

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

	console.log(form);

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

	return (
		<form
			className="validation-form"
			onSubmit={(e) => {
				e.preventDefault();
			}}>
			{validationField("email", "email", "Email")}
			{validationField("password", "password", "Password")}
			{validationField("password", "passwordRepeat", "Password repeat")}
			{validationField("tel", "phone", "Phone number")}
			{validationField("date", "dateBorn", "Birth date")}
			{/* <ValidationInput
				type="email"
				error={form.email.error}
				onInputChange={(newValue) => {
					changeInput(newValue, "", "email");
				}}
			>Email
			</ValidationInput> */}
			{/* <label htmlFor="email">
				Email
				<input
					type="email"
					id="email"
					value={form.email.value}
					onChange={(e) => {
						const newValue = e.target.value;
						changeInput(newValue, "", "email");
					}}
				/>
				{form.email.error && <div>{form.email.error}</div>}
			</label> */}

			<label htmlFor="password">
				Password
				<input
					type="password"
					id="password"
					value={form.password.value}
					onChange={(e) => {
						const newValue = e.target.value;
						changeInput(newValue, "", "password");
					}}
				/>
				{form.password.error && <div>{form.password.error}</div>}
			</label>

			<label htmlFor="passwordRepeat">
				Repeat password
				<input
					type="password"
					id="passwordRepeat"
					value={form.passwordRepeat.value}
					onChange={(e) => {
						const newValue = e.target.value;
						changeInput(newValue, "", "passwordRepeat");
					}}
				/>
				{form.passwordRepeat.error && <div>{form.passwordRepeat.error}</div>}
			</label>

			<label htmlFor="phone">
				Phone number
				<input
					type="tel"
					id="phone"
					value={form.phone.value}
					onChange={(e) => {
						const newValue = e.target.value;
						changeInput(newValue, "", "phone");
					}}
				/>
				{form.phone.error && <div>{form.phone.error}</div>}
			</label>

			<label htmlFor="dateBorn">
				Birth date
				<input
					type="date"
					id="dateBorn"
					value={form.dateBorn.value}
					onChange={(e) => {
						const newValue = e.target.value;
						changeInput(newValue, "", "dateBorn");
					}}
				/>
				{form.dateBorn.error && <div>{form.dateBorn.error}</div>}
			</label>

			{/* <label htmlFor="agreeCheck">
        <input
          type="checkbox"
          id="agreeCheck"
          checked={!!form.agreeCheck.value}
          onChange={(e) => {
            const newValue = e.target.value;
            changeInput(newValue, "", "agreeCheck");
          }}
        />
          You agree with data?
        {form.agreeCheck.error && <div>{form.agreeCheck.error}</div>}
      </label> */}

			<Button type="submit">Save</Button>
		</form>
	);
};
