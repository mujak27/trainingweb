import { makeSchema } from 'nexus'
// const {makeSchema} = require('nexus')
import path from 'path'
import * as types from './nexusTypes'


export const schema = makeSchema({
  types,
  outputs:{
    schema: path.join(__dirname, 'schema.graphql'),
    typegen: path.join(__dirname, 'types.ts')
  },
  contextType:{
    module: require.resolve('../utils/context.ts'),
    export: 'Context',
    alias: 'Context'
  }
})