import React, { useState, useEffect } from "react";
import {
	FormToggle,
	Toolbar,
	PanelRow,
	PanelBody,
	Icon
} from "@wordpress/components";

const { InspectorControls, BlockControls, BlockIcon } = wp.blockEditor;

import { clone, pullAt } from "lodash";

const { RichText } = wp.blockEditor;

function edit(props) {
	let { options, isRequired, label, id } = props.attributes;

	const [select, setSelect] = useState([]);

	useEffect(() => {
		let { options } = props.attributes;

		setSelect(options);

		props.setAttributes({ id: props.clientId });
	}, []);

	const handleRequired = () => {
		const { isRequired } = props.attributes;

		props.setAttributes({ isRequired: !isRequired });
	};

	const addSelect = () => {
		let newOption = {
			label: "Option " + (select.length + 1)
		};

		let new_options = clone(select);

		new_options.push(newOption);

		props.setAttributes({ options: new_options });
		setSelect(new_options);
	};

	const handleDelete = index => {
		let new_options = clone(options);

		let deleted_options = pullAt(new_options, [index]); //dosen't matter :-D

		props.setAttributes({ options: new_options });
		setSelect(new_options);
	};

	const handleLabel = label => {
		props.setAttributes({ label });
	};

	const handleChange = (e, index) => {
		let new_options = clone(options);

		new_options[index].label = e.target.value;

		setSelect(new_options);
		props.setAttributes({ options: new_options });
	};

	const editView = select.map((s, index) => {
		return (
			<div className="cwp-select-option">
				<input
					onChange={e => handleChange(e, index)}
					type="text"
					value={s.label}
				/>
				<button onClick={() => handleDelete(index)}>
					<Icon icon="trash" />
				</button>
			</div>
		);
	});

	const SelectView = () => {
		return (
			<select>
				<option value="" disabled selected>
					Select your option
				</option>
				{select.map((s, index) => {
					return <option value={s.label}>{s.label}</option>;
				})}
			</select>
		);
	};

	return [
		<InspectorControls>
			<PanelBody title="Field Settings" initialOpen={true}>
				<PanelRow>
					<h3 className="cwp-heading">Required</h3>
					<FormToggle
						label="Required"
						checked={isRequired}
						onChange={handleRequired}
					/>
				</PanelRow>
			</PanelBody>
		</InspectorControls>,
		null,
		<div className="cwp-select cwp-field">
			{!!props.isSelected && (
				<div className="cwp-required">
					<h3>Required</h3>
					<FormToggle checked={isRequired} onChange={handleRequired} />
				</div>
			)}
			{!props.isSelected && isRequired && (
				<div className="cwp-required cwp-noticed">
					<h3>Required</h3>
				</div>
			)}
			<div className="cwp-select-set">
				<RichText tag="label" value={label} onChange={handleLabel} />
				{!!props.isSelected ? editView : <SelectView />}
				{!!props.isSelected && (
					<div className="cwp-select-controls">
						<button onClick={addSelect}>Add Option</button>
					</div>
				)}
			</div>
		</div>
	];
}

export default edit;
