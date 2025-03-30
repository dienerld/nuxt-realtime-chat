<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'
import type { User } from '~/entities/user.model'

const props = defineProps<{ user: User }>()
const emit = defineEmits<{
  (e: 'wantsClearConversation'): void
  (e: 'wantsDeleteContact'): void
}>()
const items: DropdownMenuItem[] = [
  {
    label: 'Limpar Conversa',
    icon: 'i-lucide-triangle-alert',
    disabled: true,
    onSelect: () => emit('wantsClearConversation'),
  },
  {
    label: 'Excluir Contato',
    icon: 'i-lucide-trash',
    disabled: true,
    onSelect: () => emit('wantsDeleteContact'),
  },
]
</script>

<template>
  <div class="flex w-full justify-between">
    <div class="flex items-center gap-2">
      <UAvatar
        :alt="props.user.name"
        class="w-10 h-10 rounded-full"
      />
      <div class="flex flex-col">
        <span class="text-sm font-medium text-dark-800 dark:text-dark-200">
          {{ props.user.name }}
        </span>
        <span class="text-xs text-dark-500 dark:text-dark-400">
          Online
        </span>
      </div>
    </div>
    <UDropdownMenu :items>
      <UButton
        icon="i-lucide-menu"
        color="neutral"
        variant="ghost"
      />

      <template #item="{ item }">
        <UTooltip :text="item.disabled ? 'Funcionalidade ainda não implementada' : ''">
          <UButton
            :icon="item.icon"
            :disabled="item.disabled"
            :label="item.label"
            color="neutral"
            variant="ghost"
            @click="item.onSelect"
          />
        </UTooltip>
      </template>
    </UDropdownMenu>
  </div>
</template>
