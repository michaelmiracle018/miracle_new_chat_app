import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = sanityClient({
	projectId: "21bk2ppr",
	dataset: "production",
	apiVersion: "2022-11-18",
	useCdn: true,
	token:
		"skz8TVqPc5sX1RZWaxZFz1VzK8n1NMZUwxlcoEABcmNAv1KCK7JpSelmP5eYYqfJqqIO28IAveEoQj7i5q0ivA4rs8o67ZJ7u5tUVZ1oqItJQ27XlKo1Fm0dS5qb108dTu6mfxd2onp0zPu5YU8dvjuBrDL2SSnAg40sbRggiSdT75svdo2t",
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
