export const updateObject = (oldObject, updatedProperties) => {
	const updated = {
		...oldObject,
		...updatedProperties,
	};
	return updated;
};
