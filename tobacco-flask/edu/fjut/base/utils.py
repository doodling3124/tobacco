class copy_utils:

    @staticmethod
    def obj_to_dic(obj):
        '''
        将传入的data对象转成字典
        '''
        result = {}
        if obj is not None:
            for temp in obj.__dict__:
                if temp.startswith('_') or temp == 'metadata':
                    continue
                result[temp] = getattr(obj, temp)
        return result

    @staticmethod
    def obj_to_list(list_obj):
        '''
        将传入的data对象转成List,list中的元素是字典
        '''
        result = []
        if list is not None:
            for obj in list_obj:
                result.append(copy_utils.obj_to_dic(obj))
        return result
