export function getFieldName(field, id) {
	let shorten_id = id.substring(0, 6);

	return field + "-" + shorten_id;
}

export function getFieldIcon(name) {
	let field = name.split("-")[0];

	switch (field) {
		case "email":
			return "email";
		case "name":
			return "admin-users";
		case "message":
			return "testimonial";
		case "checkbox":
			return "yes";
		case "datepicker":
			return "calendar-alt";
		case "radio":
			return "marker";
		case "phone":
			return "phone";
		case "website":
			return "laptop";
		case "text":
			return "text";
		case "select":
			return "menu-alt";
		default:
			return;
	}
}