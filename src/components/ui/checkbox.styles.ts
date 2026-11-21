// Framework-free: plain class strings for each part, so any version of 13UI can share them.
export const checkboxStyles = {
  root: "group/checkbox grid size-4 shrink-0 cursor-default place-items-center rounded-[4px] border border-input bg-surface text-primary-foreground outline-none transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring data-checked:border-primary data-checked:bg-primary data-indeterminate:border-primary data-indeterminate:bg-primary data-disabled:border-border data-disabled:bg-muted data-disabled:data-checked:bg-subtle-foreground data-disabled:data-checked:border-subtle-foreground",
  indicator: "grid place-items-center [&_svg]:size-3",
  indeterminate: "hidden group-data-indeterminate/checkbox:block",
}
