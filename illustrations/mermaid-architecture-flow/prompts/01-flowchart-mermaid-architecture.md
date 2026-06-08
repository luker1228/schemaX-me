---
illustration_id: 01
type: flowchart
style: sketch-notes
palette: macaron
language: zh
---

数据库事实层 -> 设计态 -> 运行态 -> 消费端

Layout: top-down layered architecture flowchart

ZONES:
- Zone 1: 数据库事实层，包含 model_database、models、field_definitions、logical_foreign_keys、model_enums、model_field_enum_associations、业务数据表 database_name.model_name，作为最底层事实来源
- Zone 2: 设计态，展示 设计态1 控制 meta 增强信息并落库、设计态2 从数据库表反向恢复并补全 meta、增强 meta (enum / relation / widget / nullable)、暴露 JSON Schema Draft 7 + x-mc
- Zone 3: 运行态，展示 暴露 GraphQL Schema、RLS GraphQL 规则、权限 intercept (CheckAction + RowFilter)、graphqlRequestContext (clientRepo / perms / loaders)、GraphQL 执行、SQL Mapper、ClientDBRepoImpl、实际 DB 查询
- Zone 4: 消费端，展示 前端表单 / RJSF、动态 GraphQL API、CLI introspect + run query

LABELS:
- model_database, models, field_definitions, logical_foreign_keys, model_enums, model_field_enum_associations
- belongs_to_fk_id / relate_fk_id
- enum_name
- model_id / ref_model_id
- field_name <-> enum_name
- JSON Schema Draft 7 + x-mc
- GraphQL Schema
- CheckAction + RowFilter
- clientRepo / perms / loaders
- SQL Mapper
- ClientDBRepoImpl
- 实际 DB 查询
- 前端表单 / RJSF
- 动态 GraphQL API
- CLI introspect + run query

COLORS:
- Warm Cream background (#F5F0E8)
- Black (#1A1A1A) for all lines, text, arrows, and icons
- Soft pastel blocks in Light Blue (#A8D8EA), Mint Green (#B5E5CF), Lavender (#D5C6E0), Peach (#FFD5C2)
- Coral Red (#E8655A) sparingly for emphasis and deny-path indicators

STYLE:
- Hand-drawn educational flowchart, slightly wobbly black lines, rounded boxes, gentle pastel fills, generous white space
- Clean composition, simple or no background, no photorealism, no 3D, no busy texture
- Use clear top-down directional arrows connecting the four zones
- Make the diagram look like a well-organized sketchnote on cream paper
- If showing text, keep it concise, readable, and in Chinese where appropriate
- The deny path from permissions to consumer side should be shown as a dotted red arrow labeled deny

ASPECT: 16:9
