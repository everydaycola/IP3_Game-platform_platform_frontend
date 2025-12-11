import "@testing-library/jest-dom/vitest";
import {vi } from "vitest";

const mockUseSecurityStore = vi.fn();

vi.mock('../src/stores/securityStore.ts', () => ({
    useSecurityStore: mockUseSecurityStore
}));

import { mockuser } from "./test/data/TestUserData";
import axios from "axios";

vi.mock('axios');

export function mockSignedOutUser() {
    mockUseSecurityStore.mockImplementation((selector: unknown) => {
        const state = {
            isInitialised: false,
            loggedInUser: undefined,
            init: vi.fn(),
            login: vi.fn(),
            logout: vi.fn(),
            isAuthenticated: () => false,
            updateUserFromToken: vi.fn(),
        };
        return typeof selector === 'function' ? selector(state) : state;
    });
}

export function mockLoggedInUser(user = mockuser) {
    mockUseSecurityStore.mockImplementation((selector: unknown) => {
        const state = {
            isInitialised: true,
            loggedInUser: user,
            init: vi.fn(),
            login: vi.fn(),
            logout: vi.fn(),
            isAuthenticated: () => true,
            updateUserFromToken: vi.fn(),
        };
        return typeof selector === 'function' ? selector(state) : state;
    });
}

export function mockAnotherUser() {
    mockUseSecurityStore.mockImplementation((selector: unknown) => {
        const state = {
            isInitialised: true,
            loggedInUser: { ...mockuser, username: "currentUser" },
            init: vi.fn(),
            login: vi.fn(),
            logout: vi.fn(),
            isAuthenticated: () => true,
            updateUserFromToken: vi.fn(),
        };
        return typeof selector === 'function' ? selector(state) : state;
    });
}

export const mockedAxios = axios as unknown;