import axios from "axios";

export type Post = {
	userId: number;
	id: number;
	title: string;
	body: string;
};
export const fetchHello = async () => {
	try {
		const { data } = await axios.get<Post>(
			"https://jsonplaceholder.typicode.com/posts/1"
		);
		return { data, error: null };
	} catch (error: unknown) {
		console.log("catchしたエラー", error);
		throw { data: null, error };
	}
};
