'use client'
import { HStack, Heading, Stack, Table, Button, Box, Flex, Input } from "@chakra-ui/react"
import {
  FileUploadList,
  FileUploadRoot,
  FileUploadTrigger,
} from "@/components/ui/file-upload"
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "@/components/ui/pagination"
import { HiUpload } from "react-icons/hi"
import { useEffect, useState } from "react"
import { getTransactions, createTransactions } from "@/repositories/transactions"
import ITransactionPaginated from '@/interfaces/iTransactionPaginated'
import { Spinner } from "@chakra-ui/react"
import moment from "moment"

export default function Home () {
  const [loading, setLoading] = useState(true)
  const [loadingSearch, setLoadingSearch] = useState(true)
  const [items, setItems] = useState<ITransactionPaginated>({ docs: [], totalDocs: 0, limit: 0, totalPages: 0, page: 0 })
  const [filterId, setFilterId] = useState('')
  const [filterName, setFilterName] = useState('')
  const [filterDocument, setFilterDocument] = useState('')
  const [filterDateStart, setFilterDateStart] = useState('')
  const [filterDateEnd, setFilterDateEnd] = useState('')
  let page = 1


  useEffect(() => {
    getTransactions(getFilter())
      .then((transactions) => {
        setItems(transactions)
        setLoadingSearch(false)
        setLoading(false)
      })
      .catch((err) => {
        setLoadingSearch(false)
        setLoading(false)
        console.error('Error: ' + err)
      })
  }, [])

  const getFilter = (): string => {
    return `id=${filterId}&customerName=${filterName}&customerDocument=${filterDocument}&dateStart=${filterDateStart}&dateEnd=${filterDateEnd}&page=${page}&sort=date`
  }
  const doSearch = async (): Promise<void> => {
    const filter = getFilter()
    setLoadingSearch(true)
    try {
      const transactions = await getTransactions(filter)
      setItems(transactions)
    } catch (error) {
      console.error(error)
    }
    setLoadingSearch(false)
  }

  const nextPage = (): any => {
    page = items.page < items.totalPages ? items.page + 1 : items.totalPages
    doSearch()
  }

  const prevPage = (): any => {
    page = items.page - 1 || 1
    doSearch()
  }

  const selectPage = (newPage: number): any => {
    page = newPage
    doSearch()
  }

  const uploadFile = async (event: any): Promise<void> => {
    setLoading(true)
    try {
      const file = event.target.files?.[0]
      if (!file) return
      const formData = new FormData()
      formData.append('file', file)
      await createTransactions(formData)
      const transactions = await getTransactions(getFilter())
      setItems(transactions)
    } catch (error) {
      console.error(error)
    }
    setLoading(false)
  }

  return (
    <Box p={20} divideY="2px" >
      <FileUploadRoot onInput={(e) => uploadFile(e)}>
        <FileUploadTrigger asChild>
          <Button variant="outline" size="sm" disabled={loading}>
            { loading ? <Spinner size="sm" /> : <><HiUpload /> Selecione o Arquivo</> }
          </Button>
        </FileUploadTrigger>
        <FileUploadList />
      </FileUploadRoot>
      <Stack w="full" mt={10} p={4} borderRadius="md" rounded="md" borderWidth="1px">
        <Heading size="xl">Transações</Heading>
        <Flex gap={2}>
          <Input placeholder="Id da Transação" onChange={(e) => setFilterId(e.target.value)} />
          <Input placeholder="Nome Cliente" onChange={(e) => setFilterName(e.target.value)} />
          <Input placeholder="CPF ou CNPJ" onChange={(e) => setFilterDocument(e.target.value)} />
        </Flex>
        <Flex gap={2}>
          <Input type="date" onChange={(e) => setFilterDateStart(e.target.value)} />
          <Input type="date" onChange={(e) => setFilterDateEnd(e.target.value)} />
          <Button variant="outline" w={100} size="sm" disabled={loadingSearch} onClick={doSearch}>
            { loadingSearch ? <Spinner size="sm" /> : <>Buscar</> }
          </Button>
        </Flex>
        <Table.Root size="sm" variant="outline" striped>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>Id</Table.ColumnHeader>
              <Table.ColumnHeader>Cliente</Table.ColumnHeader>
              <Table.ColumnHeader>Documento</Table.ColumnHeader>
              <Table.ColumnHeader>Valor</Table.ColumnHeader>
              <Table.ColumnHeader>Data</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {items.docs.map((item) => (
              <Table.Row key={item.id}>
                <Table.Cell>{item.id}</Table.Cell>
                <Table.Cell>{item.customer.name}</Table.Cell>
                <Table.Cell>{item.customer.document}</Table.Cell>
                <Table.Cell>{item.value.toString()}</Table.Cell>
                <Table.Cell>{moment.utc(item.date).format('DD/MM/YYYY')}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>

        <PaginationRoot count={items.totalPages} pageSize={5} page={items.page}>
          <HStack wrap="wrap">
            <PaginationPrevTrigger onClick={prevPage} />
            <PaginationItems onClick={(e) => selectPage(parseInt((e.target as HTMLElement).innerText!))} />
            <PaginationNextTrigger onClick={nextPage} />
          </HStack>
        </PaginationRoot>
      </Stack>
    </Box>
  )
}
