import React from "react";
import { FieldError } from "react-hook-form";
import { capitalize } from "../../utils/helpers";

type InputProps = {
	label: string;
	error?: FieldError;
	options: string[];
} & React.InputHTMLAttributes<HTMLSelectElement>;

const BaseSelect = (
	{ label, error, options, children, ...props }: InputProps,
	ref: React.LegacyRef<HTMLSelectElement> | undefined
) => (
	<div className={`form-group ${error ? "invalid" : ""}`}>
		<label htmlFor={props.id}>{label}</label>
		<select {...props} ref={ref}>
			{children}
			{options.map((option) => (
				<option key={option} value={option}>
					{capitalize(option)}
				</option>
			))}
		</select>
		{error && <span className="error">{error.message}</span>}
	</div>
);

export const Select = React.forwardRef<HTMLSelectElement, InputProps>(
	BaseSelect
);
