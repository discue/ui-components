// Global Jest setup for Vue Test Utils
// Stubs Teleport to render inline for stable unit tests
import { config } from '@vue/test-utils'

config.global = config.global || {}
config.global.stubs = config.global.stubs || {}
config.global.stubs.Teleport = { template: '<div><slot/></div>' }
