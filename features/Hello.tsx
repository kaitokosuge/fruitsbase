import React from "react";
import { fetchHello } from "./fetchHello";

export default async function Hello() {
	const { data } = await fetchHello();
	return <div>{data.title}</div>;
}
