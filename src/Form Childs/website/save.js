import React from "react";
import { isEmpty } from "lodash";
import { strip_tags } from "../../block/misc/helper";

function save(props) {
	const {
		website,
		isRequired,
		label,
		id,
		requiredLabel,
		messages: { invalid, empty },
		messages
	} = props.attributes;

	const getLabel = () => {
		const { label, isRequired } = props.attributes;
		let required = !isEmpty(requiredLabel)
			? `<abbr title="required" aria-label="required">${requiredLabel}</abbr>`
			: "";
		let required_label = label + " " + required;

		if (isRequired) return required_label;

		return label;
	};
	let errors = JSON.stringify({
		mismatch: invalid,
		empty
	});
	return (
		<div className="cwp-website cwp-field">
			<div className="cwp-field-set">
				{!isEmpty(label) && (
					<label
						for={id}
						dangerouslySetInnerHTML={{ __html: getLabel() }}
					></label>
				)}
				<input
					id={id}
					aria-label={strip_tags(label)}
					data-cwp-field
					required={isRequired}
					type="url"
					data-errors={errors}
					name={id}
					type="url"
					placeholder={website}
				/>
			</div>
		</div>
	);
}

export default save;
