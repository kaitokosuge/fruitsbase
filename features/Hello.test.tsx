import { render, screen } from "@testing-library/react";
// import { http, HttpResponse } from "msw";
import { afterAll, afterEach, beforeEach, expect, test } from "vitest";
import Hello from "./Hello";
import { server } from "./../app/__tests__/msw/server";

beforeEach(() => {
	server.listen();
});

afterEach(() => {
	server.resetHandlers();
});

afterAll(() => {
	server.close();
});
test("リクエスト成功時、titleが表示されるか", async () => {
	const result = await Hello();
	render(result);
	expect(
		screen.getByText(
			"sunt aut facere repellat provident occaecati excepturi optio reprehenderit"
		)
	).toBeDefined();
});
