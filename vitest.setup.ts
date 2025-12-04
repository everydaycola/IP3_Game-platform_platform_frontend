//This file contains general setup and will be execute on every single test!
import { expect } from "vitest";
import * as matchers from "@testing-library/jest-dom/matchers";

expect.extend(matchers);