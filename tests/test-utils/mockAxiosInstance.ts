import type { AxiosInstance } from "axios";
import { mock } from "vitest-mock-extended";

export const mockAxiosInstance = () => mock<AxiosInstance>();
