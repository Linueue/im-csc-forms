export class SignatureData
{
    width: number = 0;
    height: number = 0;
    layers: string[] = $state<string[]>([]);
    private revertLayerIdx = 0;

    begin()
    {
        this.revertLayerIdx = this.layers.length;
    }

    revert()
    {
        const changesNum = this.layers.length - this.revertLayerIdx;
        for(let i = 0; i < (changesNum); i++)
            this.layers.pop();
    }

    getPath()
    {
        let path = "";

        for(const layer of this.layers)
            path += layer;

        return path;
    }
};
