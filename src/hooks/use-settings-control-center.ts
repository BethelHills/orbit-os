"use client";

import { useCallback, useState } from "react";

import {
  buildSettingsMeta,
  DEFAULT_SETTINGS_STATE,
  type AgentBehaviorPreset,
  type NotificationPreferenceKey,
  type SafetyMode,
  type SettingsControlCenterState,
  type SettingsMeta,
} from "@/lib/settings-data";
import { AOMI_BACKEND_URL } from "@/lib/integrations-data";
import { CHAIN_ID } from "@/lib/env";

/** Local UI state only — replace with persisted settings API later (no secrets). */
export function useSettingsControlCenter() {
  const [state, setState] =
    useState<SettingsControlCenterState>(DEFAULT_SETTINGS_STATE);

  const meta: SettingsMeta = buildSettingsMeta({
    chainId: CHAIN_ID,
    backendUrl: AOMI_BACKEND_URL,
  });

  const setSafetyMode = useCallback((safetyMode: SafetyMode) => {
    setState((prev) => ({ ...prev, safetyMode }));
  }, []);

  const setManualConfirmation = useCallback((manualConfirmation: boolean) => {
    setState((prev) => ({ ...prev, manualConfirmation }));
  }, []);

  const setSimulateBeforeSign = useCallback((simulateBeforeSign: boolean) => {
    setState((prev) => ({ ...prev, simulateBeforeSign }));
  }, []);

  const setAgentPreset = useCallback((agentPreset: AgentBehaviorPreset) => {
    setState((prev) => ({ ...prev, agentPreset }));
  }, []);

  const setNotification = useCallback(
    (key: NotificationPreferenceKey, enabled: boolean) => {
      setState((prev) => ({
        ...prev,
        notifications: { ...prev.notifications, [key]: enabled },
      }));
    },
    [],
  );

  const resetToDefaults = useCallback(() => {
    setState(DEFAULT_SETTINGS_STATE);
  }, []);

  return {
    state,
    meta,
    setSafetyMode,
    setManualConfirmation,
    setSimulateBeforeSign,
    setAgentPreset,
    setNotification,
    resetToDefaults,
  };
}
